CREATE TABLE Item
(
    itemID INT PRIMARY KEY,
    title TEXT,
    category TEXT,
    description TEXT,
    img TEXT,
    aisle TEXT,
    price REAL
);

CREATE TABLE PurchaseContainsItem
(
    PurchaseID SERIAL,
    username TEXT,
    itemID INT NOT NULL ,
    quantity INT,
    PRIMARY KEY(PurchaseID, username, itemID),
    FOREIGN KEY(PurchaseID, username) REFERENCES
Purchase(PurchaseID, username) ON DELETE CASCADE,
    FOREIGN KEY(itemID) REFERENCES Item(itemID)
);


CREATE TABLE Purchase
(
    PurchaseID SERIAL,
    username TEXT NOT NULL,
    Price REAL,
    Date TIMESTAMP,
    Finished BOOLEAN,
    PRIMARY KEY(PurchaseID, username),
    FOREIGN KEY(username) REFERENCES users(username) ON DELETE CASCADE
);


CREATE TABLE users
(
    username TEXT PRIMARY KEY,
    password TEXT,
    fname TEXT,
    lname TEXT,
    address
        TEXT,
    DOB DATE
);

CREATE TABLE PastPurchase
(
    PastPurchaseID SERIAL,
    username TEXT NOT NULL,
    checkoutTime TIMESTAMP,
    totalPrice REAL,
    PRIMARY KEY(PastPurchaseID, username),
    FOREIGN KEY(PastPurchaseID, username) REFERENCES Purchase(PurchaseID, username)
); 