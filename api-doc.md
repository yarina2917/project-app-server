**Get users**
----
* **URL**

   /users/get
   
* **Method:**

   GET
   
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
        [
            {
                "_id": "5dfa660287c5ba2d97a86b84",
                "firstName": "Yana",
                "lastName": "Yana",
                "email": "yana@gmail.com",
                "password": "12345",
                "role": "Admin"
            },
            {
                "_id": "5dfa660287c5ba2d97a86b84",
                "firstName": "Yana",
                "lastName": "Yana",
                "email": "yana@gmail.com",
                "password": "12345",
                "role": "User"
            }
        ]
   ```
   
*  **Failure Response:**
   
      **Code:** 
      
      **Content:**
      
    
**Get user**
----

* **URL**

   /users/get-one/:id
   
* **Method:**

   GET
   
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
        {
            "_id": "5dfa660287c5ba2d97a86b84",
            "firstName": "Yana",
            "lastName": "Yana",
            "email": "yana@gmail.com",
            "password": "12345",
            "role": "Admin"
        }
   ```
   
*  **Failure Response:**
   
      **Code:** 
      
      **Content:**  

**Create user**
----

* **URL**

   /users/create
   
* **Method:**

   POST

* **Data params**

    firstName = [string]
    
    lastName = [string]
    
    email = [string]
    
    password = [string] 
    
    role = [string]
    
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
       {
           "_id": "5dfa660287c5ba2d97a86b84",
           "firstName": "Yana",
           "lastName": "Yana",
           "email": "yana@gmail.com",
           "password": "12345",
           "role": "Admin"
       }
   ```
   
*  **Failure Response:**
   
      **Code: 401** 
      
      **Content:** Email is already used  
   
**Login user**
----

* **URL**

   /users/login
   
* **Method:**

   POST

* **Data params**
    
    email = [string]
    
    password = [string] 
    
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
        {"_id": "5dfa660287c5ba2d97a86b84"}
   ```
   
*  **Failure Response:**
   
      **Code:**  401
      
      **Content:** Wrong login data        

**Update user**
----

* **URL**

   /users/update/:id
   
* **Method:**

   PUT

* **Data params**

    firstName = [string]
    
    lastName = [string]
    
    email = [string]
    
    password = [string] 
    
    role = [string]
    
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
       {
           "_id": "5dfa660287c5ba2d97a86b84",
           "firstName": "Yana",
           "lastName": "Yana",
           "email": "yana@gmail.com",
           "password": "12345",
           "role": "Admin"
       }
   ```
   
*  **Failure Response:**
   
      **Code:** 
      
      **Content:**

**Delete user**
----

* **URL**

   /users/delete/:id
   
* **Method:**

   Delete
    
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
       {"message": "User was deleted"}
   ```
   
*  **Failure Response:**
   
      **Code:** 
      
      **Content:**
