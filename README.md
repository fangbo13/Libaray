
# Library Loans

The University library allows staff and students to locate and borrow books for pre-determined periods of time.

---

## Testing

You are required to create the following accounts to allow the system to be tested. All accounts should have the password `p455w0rd`:

1. `student1`
2. `student2`
3. `librarian1`
4. `librarian2`

---

## Feature 1

This will allow librarians to add books to the system. In a library books database there are likely to be more than one book with the same ISBN number. For this reason each book needs to have its own record in the database and have a unique identifier. The identifier needs to be a **Universal Unique Identifier (UUID)**. MySQL has a `UUID()` function that can generate this for you.

When a librarian logs in they should see an **Add book** link or button on the homepage. Clicking this takes them to the _Add Book_ screen where they can add books to the library. This will ask for the following:

1. The name of the book.
2. The primary author.
3. The ISBN-13 number.
4. The Dewey Classification number.
5. The quantity to add as a slider with a range of 1-10.

This should add one record for each individual book, so for example if the quantity was set to 3 this will add three records to the database, each with a different UUID.

In addition to the data from the form, the following extra information needs to be added (without asking the user).

1. The username of the librarian adding the books.
2. The current date and time.
3. The UUID.

## Feature 2

If the librarian is logged in they should see a book stock list on their home page. This should list all the books stocked by the library. This should display the following:

1. The book title.
2. The primary author.
3. The quantity of this book in stock (based on the ISBN number).

## Feature 3

The librarian should see a button labelled **Manage user**. Clicking on this takes them to a screen that asks for the student username. After entering this they can see the student borrowing record (what they currently have booked out). This should display the following information on each borrowed book:

1. The book title.
2. When it is due to be returned, displaying the date as DD/MM/YYYY but not the time (overdue books need to be highlighted). You can choose how long books can be borrowed.

There should be a **Return** link or button next to each book. Clicking this returns the book to stock so another user can borrow it.

There should be a textbox where the librarian can enter the UUID of a book the user wants to borrow. This adds the book to the user's borrowing record and prevents the book being booked by a different user.

## Feature 4

When the user logs in they can see their borrowing record (title and return date (not time). They should see a search box where they can search for books by entering a partial book title or author. The search results should display the following:

1. The book title.
2. The primary author.
3. The number stocked.
4. The number currently available.

---

## Extras

### Sensors

Rather than entering the ISBN numbers into the system manually use either a USB barcode scanner or a smartphone camera to scan the barcode on the back of the book.

### Data

The [Google Books API](https://www.googleapis.com/books/v1/volumes?q=isbn:9780596517748) allows you to retrieve book data based in the ISBN number.

# Home Page

The home page allows you to choose your login type.

If you are librarian,you can click **I am librarian** to go to the librarian login page.

If you are student,you can click **I am student** to go to the student login page

## Login Page

### Librarian Login Page

You should input your username and password to login.

There are two built-in account:

```bash
librarian1
p455w0rd
```

```bash
librarian2
p455w0rd
```

### Student Login Page

You should input your username and password to login.

There are two built-in account:

```bash
student1
p455w0rd
```

```bash
student2
p455w0rd
```

You can also click the **Register** button to register a new student account

## Register Page

We need username,password and email information to create an account for you.

Make sure your username is unique and email is in correct format.

### Book Stock Page

When librarian login success,you can see the book stock page.

There will be a table show you which books are in stock and their quantity.
There are two buttons for you to do some operation:

1.Manage user
2.Add stock

### Manage User Page

When you click **Manage user** button in book stock page,you will enter a user search page to input student name.

Submit it and you can enter the manage user page.

This page shows you which books are borrowed by this student.If a borrow record is overdue,the background of this record will be read.

Librarian can click the **Return book** button to return borrow record for student.

Librarian can also click the **borrow** button to borrow books for student

## Borrow Book Page

Librarian input student name and UUID of book to borrow book for student.

Make sure the student name and UUID is exist and the book is not borrowed.

## Borrow Records Page

After students login, they will enter the borrow records page.

This page shows the borrow records of the student.

If the borrow record is overdue,its background will be red.

## Search books

Student can input the book title or author name to search books.

This page shows the book title,author,stock and availabe of books.
