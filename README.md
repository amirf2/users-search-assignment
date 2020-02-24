<h1>Implementation Details</h1>

To implement this assignment, I used node.js, alongside a few other npm packages, for parsing the CSV file. Since no external database was required/allowed, I loaded all the data to the main memory, using Map and a Prefix Trie as my data structures, in order to get the best asymptotic runtime for the required API.

### getting users by id/country:
I used JS Map with id/country as keys.

### getting users by age:
I used JS Map with the year, month and day of the user's dob as keys. Also, I used the javascript date object to determine the required dates for the age we are looking for from the GET request.

### getting user by name:
I used JS Map with full names and first/last names as keys. Also, I used trie to add the first/last names prefixes, so we can know which keys to retrieve from the userMapByName.

### delete user by id:
I retrieve all the relevant user information (name, country, dob) from the userMapByID, that was used as keys in the data structures, and then removed all other references.

<h1><a id="user-content-time-and-space-complexity-analysis" class="anchor" aria-hidden="true" href="#time-and-space-complexity-analysis"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Time And Space Complexity Analysis</h1>
<h2><a id="user-content-runtime-complexity" class="anchor" aria-hidden="true" href="#runtime-complexity"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Runtime Complexity:</h2>
<h4><a id="user-content-initialization-the-data" class="anchor" aria-hidden="true" href="#initialization-the-data"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Initialization the data:</h4>
<p>In each iteration, we parse a single user from the CSV data file and add it to the Maps and Trie Data Structures. Adding a (key, value) entry to the Map’s data structures should take <code>O(1)</code>. Adding a name to the Trie should take <code>O(Length of First/Last name)</code>, but we can assume that the length of a first/last name is blocked by some constant size so it should take <code>O(1)</code> as well. Overall, we get that the initialization runtime is <code>O(N)</code> where <code>N</code> is the number of users.</p>
<h4><a id="user-content-get-user-by-id" class="anchor" aria-hidden="true" href="#get-user-by-id"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Get user by id:</h4>
<p>Getting and retrieving the user from usersMapById by the given id from the GET request – <code>O(1)</code></p>
<p><sub></sub></p>
<h4><a id="user-content-get-users-list-by-country" class="anchor" aria-hidden="true" href="#get-users-list-by-country"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Get users list by country:</h4>
<p>Getting a reference to all the users living in a specific country by using usersMapByCountry – <code>O(1)</code>
Returning All users living in a specific country – <code>O(N<sub>country</sub>)</code>, where <code>N<sub>country</sub></code> is the number of users living in the given country from the GET request.</p>
<h4><a id="user-content-get-users-list-by-age" class="anchor" aria-hidden="true" href="#get-users-list-by-age"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Get users list by age:</h4>
<p>Getting a reference to all the users of the given age by using usersMapbyAge – <code>O(1)</code>
Returning All users of the specific age – <code>O(N<sub>age</sub>)</code>,
Where <code>N<sub>age</sub></code> is the number of users of that specific given age from the GET request.</p>
<h4><a id="user-content-get-users-list-by-name" class="anchor" aria-hidden="true" href="#get-users-list-by-name"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Get users list by name:</h4>
<p>Getting a reference to all the users of a specific full name or full single/last name by using userNameMap – <code>O(1)</code>.</p>
<p>Returning All users of that specific name – <code>O(N<sub>name</sub>)</code>, Where <code>N<sub>name</sub></code> is the number of users which have that specific name, either full name or as first/last name.</p>
<p>If nothing was found, then we’ll move to match parital name, as follow:
Retrieving all names of given prefix – <code>O(M+N<sub>prefix</sub>)</code>, where <code>M</code> is the maximum length of a first/last name, and <code>N</code> is the number of first/last names that start with that given prefix from the GET request. We can assume that the length of a first/last name is is upper bound by some constant therefore we receive <code>O(N<sub>prefix</sub>)</code>.</p>
<p>We now found all single/last names that match the prefix and we need to extract them from usersMapByName.
since we can get a reference to all the users of a specific full name or full single/last name by <code>O(1)</code>, as mentioned above, Retrieving all users which their first/last name match the prefix will take <code>O(N<sub>allMatchedUser</sub>)</code>, where <code>N<sub>allMatchedUser</sub></code> is the number of users which their first/last name match the prefix.</p>
<h4><a id="user-content-delete-user-by-id" class="anchor" aria-hidden="true" href="#delete-user-by-id"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Delete user by id</h4>
<p>deleting from Maps should take <code>O(1)</code>.
deleteing from trie will occur only if there isn't any other users with the first or last name of the user that about to be deleted. deleting should take <code>O(M)</code>, where <code>M</code> is the maximum length of a first/last name in the data. We can assume that the length of a first/last name is upper bound by some constant therefore we receive <code>O(1)</code>.</p>
<h2><a id="user-content-space-complexity" class="anchor" aria-hidden="true" href="#space-complexity"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Space Complexity:</h2>
<p>Looking at the Initialization data runtime complexity, we can infer that the total space required for the data is <code>O(N*SizeOfUserObject)</code>.</p>
<p>We are using Maps and a Trie to store a reference to the user. Since those data structures uses some of the user’s data as keys (id, name, country, dob), and since we save only a few references to the same object, the total amount of data required to store those keys is still blocked by the size of <code>O(SizeOfUserObject)</code>, therefore the total amount of memory that is required is still <code> O(N*SizeOfUserObject) </code>.</p>
<h2><a id="user-content-api" class="anchor" aria-hidden="true" href="#api"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>API</h2>
<pre><code>Get user by Id
    - GET /users/a2ee2667-c2dd-52a7-b9d8-1f31c3ca4eae
    - Should return the requested user details 

Get users list by country
    - GET /users?country=US
    - Should return a list of all users from requested country

Get users list by age
    - GET /users?age=30
    - Should return all users which are of age 30 at the time of the request

Get users list by name
    - GET /users?name=Susan
    - Should return all users which name matches the requested name
    - Matching names rules:
        - Full match - for input "Susan James" should return all users with name "Susan James".
        - Full first name or last name - for input "Susan" should return all users with that first or last name.
        - Partial match (minimum 3 chars) - for input "Sus", should return all users with first or last name that begin with "Sus".
        - Should support non case sensitive search (Searching for "susan" should return users with name "Susan").

Delete user by id
    - DELETE /users/a2ee2667-c2dd-52a7-b9d8-1f31c3ca4eae
    - Should delete the user, after the call the user will not be returned by any of the previous APIs.
</code></pre>
<h1><a id="user-content-start-up-the-service" class="anchor" aria-hidden="true" href="#start-up-the-service"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Start up the service</h1>
<pre><code>npm install
node index.js
</code></pre>
