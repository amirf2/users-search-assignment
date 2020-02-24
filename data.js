const fs = require('fs'); 
const csv = require('csv-parser');
var Trie = require('trie-prefix-tree');

const usersMapByCountry = new Map();
const usersMapByID = new Map();
const usersMapByName = new Map();
const usersMapByDateOfBirth = new Map();
const usersTrieByPartialNames = new Trie([]);

const MAX_AGE = 125;
const UNORDERED_TRIE = false;
const MINUTES_PER_HOUR = 60;



/*---------------------------------------------------------------------
                        Initialization Methods
 *--------------------------------------------------------------------*/

function init(initServer){
    fs.createReadStream(('./data.csv'))
    .pipe(csv({
        mapHeaders: ({ header, index }) => header.toLowerCase()
    }))
    .on('data', (user) => {
        if (Object.entries(user).length > 0){
            addUserToIDList(user);
            addUserToCountryList(user)
            addUserToNameLists(user);
            addUserToAgeList(user);
        }
    }).on('end', () => {
        console.log("Data Initialization.. finished");
        initServer();
    });
}


function initMapIfNotExist(map, field){
    if (!map.has(field)){
        map.set(field,new Map());
    }
}


function initDateIfNotExist(day, month, year){
    if (!usersMapByDateOfBirth.has(year)){
        usersMapByDateOfBirth.set(year, new Map());
    }
    const yearMap = usersMapByDateOfBirth.get(year);
    if (!yearMap.has(month)){
        yearMap.set(month, new Map());
    }
    const monthMap = yearMap.get(month);
    if (!monthMap.has(day)){
        monthMap.set(day, new Map());
    }
    
}


/*---------------------------------------------------------------------
                        Adding Methods
 *--------------------------------------------------------------------*/

 
function addUserToIDList(user){
    usersMapByID.set(user.id,user);
}


function addUserToCountryList(user){
    const country = user.country.toLowerCase();
    initMapIfNotExist(usersMapByCountry,country);
    usersMapByCountry.get(country).set(user.id,user);
}


function addUserToAgeList(user){
    const birthday = user.dob;
    const birthdayDate = birthday.split('/');
    const [day,month,year] = birthdayDate;
    initDateIfNotExist(day, month ,year);
    usersMapByDateOfBirth.get(year).get(month).get(day).set(user.id,user);
}


function addUserToNameLists(user){
    const fullName = user.name.toLowerCase();   
    const splittedNames = fullName.split(' ').filter(name => name.length>0);
    addUserToFullNameList(user,fullName, splittedNames);
    addUserToParitalNameTrie(user,splittedNames);
}

function addUserToFullNameList(user ,fullName, splittedNames){
    initMapIfNotExist(usersMapByName,fullName);
    usersMapByName.get(fullName).set(user.id,user);
    const [firstName, lastName] = splittedNames;
    initMapIfNotExist(usersMapByName,firstName);
    usersMapByName.get(firstName).set(user.id,user);
    if (firstName!=lastName){
        initMapIfNotExist(usersMapByName,lastName);
        usersMapByName.get(lastName).set(user.id,user);
    }
}

function addUserToParitalNameTrie(user,splittedNames){
    const [firstName, lastName] = splittedNames;
    usersTrieByPartialNames.addWord(firstName);
    if (firstName!=lastName){
        usersTrieByPartialNames.addWord(lastName);
    }
}



/*---------------------------------------------------------------------
                        Getting Methods
 *--------------------------------------------------------------------*/


function getUserByID(id){
    id=id.toLowerCase();
    const ans = usersMapByID.get(id);
    return ans? ans : {};
}


function getUsersByCountry(country){
    country=country.toLowerCase();
    const ans = usersMapByCountry.get(country);
    return ans? [...ans.values()] : [];
}


function getUsersByName(name){
    let ans = [];
    name=name.toLowerCase();
    const splittedNames = name.split(' ').filter(name => name.length>0);
    if (splittedNames.length<=2){
        if (splittedNames.length===2){
            const fullName = splittedNames.join(' ');
            ans = usersMapByName.get(fullName);
        } else if(splittedNames.length===1) {
            const [partialName] = splittedNames;
            if (usersMapByName.has(partialName)){
                ans = usersMapByName.get(partialName);
            } else {
                ans = getUsersByPrefixName(usersMapByName, partialName);
            }
        }
    }
    return ans? [...ans.values()] : [];
}

function getUsersByPrefixName(firstCharNameList, partialName){
    const prefixNames = usersTrieByPartialNames.getPrefix(partialName,UNORDERED_TRIE);
    const ans = new Map();
    if (partialName.length>=3){
        for (const name of prefixNames){
            const nameMap = usersMapByName.get(name);
            for (const [userID, user] of nameMap){
                if (!ans.has(userID)){
                    ans.set(userID,user);
                }
            }
        }
    }
    return ans;
}


function getUsersByAge(age){
    const ans = [];
    if (age < MAX_AGE){
        const lastDate = new Date();
        setTimeGapAndYearOfBirthDay(lastDate,age);
        const firstDate = setFirstDate(lastDate);
        const firstDateYearMap = usersMapByDateOfBirth.get(firstDate.getFullYear().toString());
        dateIterator(ans,firstDateYearMap,dateNumbersToStrings(firstDate),"first");
        const lastDateYearMap = usersMapByDateOfBirth.get(lastDate.getFullYear().toString());
        dateIterator(ans,lastDateYearMap,dateNumbersToStrings(lastDate),"last");
    }
    return ans;
}


/*---------------------------------------------------------------------
                        Deleting Methods
 *--------------------------------------------------------------------*/

function deleteUser(id){
    id=id.toLowerCase();
    const user = usersMapByID.get(id);
    if (user){
        const {name,dob,country} = user;
        deleteFromUsersListByID(id);
        deleteFromUsersListByCountry(id, country.toLowerCase());
        deleteFromUsersListByNames(id,name.toLowerCase());
        deleteFromUsersListByDateOfBirth(id,dob);
    }
}


function deleteFromUsersListByCountry(id,country){
    const countryList = usersMapByCountry.get(country)
    if (countryList){
        countryList.delete(id);
    }
}


function deleteFromUsersListByID(id){
    usersMapByID.delete(id);
}


function deleteFromUsersListByFullOrSingleName(id, names){
    const SINGLE_NAME_INDEX = 1;
    names.forEach((name, index) => {
        const nameMap = usersMapByName.get(name);
        nameMap.delete(id);
        if (nameMap.size===0){
            usersMapByName.delete(name);
            if (index>=SINGLE_NAME_INDEX){
                usersTrieByPartialNames.removeWord(name);
            }
        }
    });
}


function deleteFromUsersListByNames(id,fullName){
    const splittedNames = fullName.split(' ');
    deleteFromUsersListByFullOrSingleName(id, [fullName, ...splittedNames]);
}


function deleteFromUsersListByDateOfBirth(id,dob){
    const birthdayDate = dob.split('/');
    const [day,month,year] = birthdayDate;
    usersMapByDateOfBirth.get(year).get(month).get(day).delete(id);
}


/*---------------------------------------------------------------------
                        Util Date Methods
 *--------------------------------------------------------------------*/


function setTimeGapAndYearOfBirthDay(date, age){
    const timeGap = date.getTimezoneOffset()/MINUTES_PER_HOUR;
    date.setHours(date.getHours()-timeGap);
    const reqYear = date.getFullYear() - age;
    date.setFullYear(reqYear);
}


function dateNumbersToStrings(date){
    return [
        date.getFullYear().toString(),
        (date.getMonth()+1).toString(),
        date.getDate().toString()
    ]
}


function dateIterator(ans, dateMap, date, index){
    const [dateYear, dateMonth, dayDate] = date;
    if (dateMap){
        dateMap.forEach(
            (monthMap, monthIndex) => {
                monthMap.forEach(
                    (day, dayIndex) => {
                        if (dateComparisonCondition([monthIndex, dateMonth, dayIndex, dayDate], index)){
                            ans.push(...day.values());
                        }
                    }
                )
            }
        )
    }
}

function dateComparisonCondition(dateArgs, index){
    const dateArgsAsIntegers = convertDateArgsFromStrToNum(dateArgs);
    const [monthIndex, dateMonth, dayIndex, dayDate] = dateArgsAsIntegers;
    if (index==="first"){
        return (monthIndex>dateMonth || monthIndex===dateMonth && dayIndex > dayDate);
    } else if (index==="last"){
        return (monthIndex<dateMonth || monthIndex===dateMonth && dayIndex <= dayDate);
    } else {
        console.log("Something is wrong with dateComparisonCondition");
        return false;
    }
}


function convertDateArgsFromStrToNum(dateArgs){
    return dateArgs.map(
        (arg) => {return parseInt(arg);}
        );
}


function setFirstDate(lastDate){
    const firstDate = new Date(lastDate);
    firstDate.setFullYear(firstDate.getFullYear()-1);
    firstDate.setDate(firstDate.getDate()+1);
    return firstDate;
}

   module.exports = {
       init,
       getUserByID,
       getUsersByCountry,
       getUsersByName,
       deleteUser,
       getUsersByAge
   }