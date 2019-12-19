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
   
      **Code:** [number]
      
      **Content:** [string]
      
    
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
   
      **Code:** [number]
      
      **Content:** [string]

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
   
      **Code:** [number]
      
      **Content:** [string] 
   
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
        {"token": "f76640a3-1c4e-4e40-9826-8edef0f21ce2"}
   ```
   
*  **Failure Response:**
   
      **Code:** [number]
      
      **Content:** [string]   
      
**Logout user**
----

* **URL**

   /users/logout/:id
   
* **Method:**

   GET

    
* **Success Response:**

   **Code:** 200
   
   **Content:** 
   ```json
        {"message": "Successful logout"}
   ```
   
*  **Failure Response:**
   
      **Code:** [number]
      
      **Content:** [string]            

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
   
      **Code:** [number]
      
      **Content:** [string]

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
   
      **Code:** [number]
      
      **Content:** [string]
