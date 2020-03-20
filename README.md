# VAP final assignment
<hr>

### Contents

* Assigned Target
* My Goals
* REST 6 guiding constraints and How my API is RESTful
   - **HATEOS** 
   - Cachebility
* Implementaion Details
   - Authentication and Authorization
   - Multi-Level Categorization of products
* How i solved ```fixing attributes to products based on the category of the product```
* Priveleges required for accessing resources
* Documentaion and API Links
<hr>

### 1. Assigned Target
* Design a product/inventory management system API and create Documentaion for it. The API must be documented using Swagger Tools. API must conform to OpenAPI specifications.

### 2. My Goals
* Design and Document API
* Conform to the guiding constraints of REST Architecture
* Implement an API using Express and Mongo DB
* Filter,Sort and Paginate GET request responses
* Use passport for user Authentication
* Assign fixed constraints on attributes of products in a noSQL database

### 3. REST 6 guiding constraints and How my API is RESTful
* My API follows 5 of the guiding constraints. I Have made sure to use HATEOS in GET requests. This improves discoverability of resources through published set of links (provided with response) and Indicates to Clients what actions can be taken next.
* I have implemented basic client side caching behavior in one of my get request to get list of products.
* Followed naming conventions that represent hierarchy.

### 4. Implementaion Details
I built the API using Express and MongoDB. Used JWT and Passport for Authentication. Once the user is authenticated middleware deside wether or not to give the user access to the resource. Passport JWTstratergy was used for authentication. 

### 5. How i solved fixing attributes to products based on the category of the product
```
If we see Amazon, the products are categorised into a three level categorisation. 
For example, 
* Electronics
   * Laptops
      * Ultrabooks
      * ChromeBooks
   * Phone & Tablets
      * Mobile Phones
      * Tables
      * Smart Watches

Amazon calls these as node. They use them to categorise product in a 3 layers. I have called these:
* Level-1-category(L1)
   * Level-2-category(L2)
      * category(L3)

The category(L3) determines the Attributes of the Product. For Example, Mobile Phones(memory,screen size,battery capacity etc). To achieve this i have made a service that converts a JSON schema into a JOI validation Object. The administrator creates a json representation of the object and stores it in as a category_schema. The vendor assigns a category to the product and add it to the database. The service is called during runtime and the JSON schema is converted to a JOI object which validates the attributes. The attributes are added only if they follow the constraints.

This brings forward tight-coupling between the attributes and the category.
```
### 6. Priveleges required for accessing resources
The users are given access to resource based on the role they have. The users of this application can have the following roles:
* Adminstrator
   * Has Access to all resources. Can freely perform crud operations on resources
* Vendor
   * Has Access to all GET request except users. Can perform crud operation on products and inventory.
* Customer
   * Has Access to all GET request except users. Can perform crud operations on orders.
* Shipper
   * Has Access to all GET request except users.


### 7. Documentaion and API Links
 Resources   | Links
------------ | -------------
Swagger Docs | https://app.swaggerhub.com/apis-docs/sankalpreddy/sankalp.vap/v1
API | https://vap-pms.herokuapp.com/


