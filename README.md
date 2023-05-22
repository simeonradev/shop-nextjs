shop-nextjs

My GitHub project is a web application built using React, Next.js, and various libraries and tools. The project aims to provide a user-friendly interface for browsing and managing products. 

What I have used in the project:
- React
- Node.js
- Next.js
- Redux
- Redux Saga
- React Query 
- Material-UI
- MongoDB

Some of the features are:
- Shopping Cart: Users can add products to their shopping cart, view the items in the cart, and proceed to checkout.
- Product Sorting (Filters): Users can sort and filter the products based on various criteria such as price, location, category, or any other relevant attributes.
- Liked Products: Users can mark products as their favorites or liked items, allowing them to easily keep track on those products.
- Similar Products: The project includes a feature that suggests similar products based on the product they are viewing.
- User Accounts: Users can create accounts and log in to the application, enabling personalized experiences and allowing their data to be stored securely on the server.
- Product Creation: The project includes functionality for creating new products. This feature allows authorized users to add new products to the application's database, expanding the available product catalog.
- Modals: Modal windows or dialogs are implemented to provide enhanced user interactions, such as displaying additional information about a product.
- Avatar Selection: Users have the ability to select or customize their avatar image for their user profile, adding a personal touch to their accounts.


To start, I created simple components like the Nav Bar and Side Nav Bar to establish the basic structure of the application. Then, I integrated product data and developed a ProductCard component to properly display the products.

Next, I implemented a search page with filters to enable sorting and filtering of the products. Initially, I utilized the default state management in React, but along the way, I explored different state management solutions and initially experimented with Redux. However, after careful evaluation, I opted for React Query as it proved to be more efficient for my project's needs.

To enhance the visual appeal of the application, I conducted research on UI libraries and decided to incorporate Material-UI (MUI). By integrating MUI, I was able to improve the overall look and feel of the project.

Additionally, I implemented a dark theme to provide users with a customizable visual experience and cater to different preferences.

Continuing with the development, I created a login page and a profile page. The project initially utilized local state and dummy data to implement all the features. However, as the project progressed, there was a need to persist the data and provide a more robust and scalable solution. This led to the decision to incorporate server capabilities offered by Next.js. Furthermore, I made the decision to integrate a database to store and manage the application data. MongoDB was selected as the database solution. By connecting the project to the MongoDB database, the application gained the ability to store user account information, shopping cart items, liked products, and other relevant data securely on the server. 

Overall, my GitHub project showcases the progressive development of a web application using React, Next.js, React Query, Material-UI, and MongoDB. It includes various components, features, and integrations aimed at providing a seamless and visually appealing experience for users.

A link to the project deployed by Vercel: https://shop-nextjs-eight.vercel.app/
