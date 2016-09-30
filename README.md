#### Setup & Run!

```
// check you have nodejs installed.
> npm install
> npm run test
> npm run start
```

#### Design & architecture

This implementation is broken up into 3 tiers.

![Approach](https://raw.githubusercontent.com/kahneraja/crowd-funding/master/approach.png)

#### Tools & Languages

- Javascript
- NodeJs
- mocha
- Luhn-10

See packages.json for more details on dependant packages

#### Inputs

**Input commands must be handled and passed with space-delimited
arguments via the command line or from a file passed on the command line.**

**1.** The `project` input will create a new project with a project name
and a target dollar amount.

~~~
project <project> <target amount>
~~~

* Projects should be alphanumeric and allow underscores or dashes.
* Projects should be no shorter than 4 characters but no longer than 20
  characters.
* Target dollar amounts should accept both dollars and cents.
* Target dollar amounts should NOT use the $ currency symbol to avoid issues with shell escaping.

**2.** The `back` input will back a project with a given name of the
backer, the project to be backed, a credit card number and a backing
dollar amount.

~~~
back <given name> <project> <credit card number> <backing amount>
~~~

* Given names should be alphanumeric and allow underscores or dashes.
* Given names should be no shorter than 4 characters but no longer than
  20 characters.
* Credit card numbers may vary in length, up to 19 characters.
* Credit card numbers will always be numeric.
* Card numbers should be validated using Luhn-10.
* Cards that fail Luhn-10 will display an error.
* Cards that have already been added will display an error.
* Backing dollar amounts should accept both dollars and cents.
* Backing dollar amounts should NOT use the $ currency symbol to avoid issues with shell escaping.

**3.** The `list` input will display a project including backers and
backed amounts.

~~~
list <project>
~~~

**4.** The `backer` input will display a list of projects that a backer
has backed and the amounts backed.

~~~
backer <given name>
~~~

#### Example Input and Output

```
> project Awesome_Sauce 500
Added Awesome_Sauce project with target of $500

> back John Awesome_Sauce 4111111111111111 50
John backed project Awesome_Sauce for $50

> back Sally Awesome_Sauce 1234567890123456 10
ERROR: This card is invalid

> back Jane Awesome_Sauce 4111111111111111 50
ERROR: That card has already been added by another user!
> back Jane Awesome_Sauce 5555555555554444 50

> list Awesome_Sauce
-- John backed for $50
-- Jane backed for $50
Awesome_Sauce needs $400 more dollars to be successful

> back Mary Awesome_Sauce 5474942730093167 400
Mary backed project Awesome_Sauce for $400

> list Awesome_Sauce
-- John backed for $50
-- Jane backed for $50
-- Mary backed for $400
Awesome_Sauce is successful!

> backer John
-- Backed Awesome_Sauce for $50
```
