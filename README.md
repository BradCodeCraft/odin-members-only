# Members Only

An Express application representing an exclusive clubhouse where your members
can write anonymous posts. Inside the clubhouse, members can see who the author
of a post is, but outside they can only see the story and wonder who wrote it.

## Environment Variables

For this application to work correctly, these environment variables must exist:

- `PORT` used for local development
- `CONNECTIONSTRING`used to connect to database
- `SECRET` - used for session
- `SALT` - used for hashing password
- `PASSCODE` - used for membership
- `TESTUSERPASSWORD` - used for testuser dummy user
- `TESTMEMBERPASSWORD` - used for testmember dummy user
- `TESTADMINPASSWORD` - used for testadmin dummy user

## Database

### Entity Relational Diagram

![](https://github.com/BradCodeCraft/odin-members-only/blob/main/public/odin-members-only.jpg?raw=true)

### Entities

Two main entities: User and Message

Relationship: One-to-many

Explanation: a User can have **zero or more** messages, while a Message can
only have **one** user.

## Routes

### `GET` request

`/` - retrieves welcome page

`/sign-up` - retrieves sign-up page

`/log-in` - retrieves log-in page

`/messages` - retrieves all messages page

- If user is logged in, he/she can see the author of a post

`/messages/new` - retrieves new message form page

### `POST` request

`/sign-up` - creates new user

`/log-in` - authenticates a user

`/messages/new` - creates new message

### `DELETE` request

`/userId` - deletes a user of id _userId_

> **User `DELETE` request enforce `CASCADE DELETE`**. This means that deleting
> a user will delete all messages associated with that user.

`/messages/:messageId` - delete a message of id _messageId_
