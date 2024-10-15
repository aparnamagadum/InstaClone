#InstaClone API Documentation

### User APIs:
1. **signup** - `POST` [https://instaclone-lf72.onrender.com/api/user/register]
2. **signin** - `POST` [https://instaclone-lf72.onrender.com/api/user/login]
3. **logout** - `POST` [https://instaclone-lf72.onrender.com/api/user/logout]
4. **IsLoggedIn** - `Get` [https://instaclone-lf72.onrender.com/api/user/isLoggedIn]
5. **getProfile** - `Get` [https://instaclone-lf72.onrender.com/api/user/profile/:id]
6. **editProfile** - `Patch` [https://instaclone-lf72.onrender.com/api/user/profile/:id]
7. **suggestions** - `Get` [https://instaclone-lf72.onrender.com/api/user/suggested]
8. **FollowOrUnfollow**- `Post` [https://instaclone-lf72.onrender.com/api/user/followOrUnfollow/:id]

### User's Wishlist:
10. **wishList** - `GET` [https://majorecomproject.onrender.com/ecommerce/v1/user/getwishlist]

### User's Cart:
11. **userCart** - `GET` [https://majorecomproject.onrender.com/ecommerce/v1/user/getusercart]

### Product APIs:
12. **getAllProducts** - `GET` [https://majorecomproject.onrender.com/ecommerce/v1/product/getproductslist]
13. **getSingleProduct** - `GET` [https://majorecomproject.onrender.com/ecommerce/v1/product/getproduct/:id]
14. **createProduct** - `POST` [https://majorecomproject.onrender.com/ecommerce/v1/product/createproduct]
15. **updateProduct** - `PUT` [https://majorecomproject.onrender.com/ecommerce/v1/product/update/:id]

### Product add Wishlist:
16. **addWishlist** - `POST` [https://majorecomproject.onrender.com/ecommerce/v1/product/wishlist]

### Order APIs:
17. **getOrders** - `GET` [https://majorecomproject.onrender.com/ecommerce/v1/user/getorders]
18. **createOrder** - `POST` [https://majorecomproject.onrender.com/ecommerce/v1/user/createorder]
19. **OrderStatus** - `PUT` [https://majorecomproject.onrender.com/ecommerce/v1/user/order/updateorderstatus/:id]

### Cart APIs:
20. **addCart** - `POST` [https://majorecomproject.onrender.com/ecommerce/v1/user/cart]
21. **emptyCart** - `DELETE` [https://majorecomproject.onrender.com/ecommerce/v1/user/emptycart]
22. **getUserCart** - `GET` [https://majorecomproject.onrender.com/ecommerce/v1/user/getusercart]

### Blog APIs:
23. **getAllBlogs** - `GET` [https://majorecomproject.onrender.com/ecommerce/v1/blog/getallblogs]
24. **getSingleBlog** - `GET` [https://majorecomproject.onrender.com/ecommerce/v1/blog/getblogbyid/:id]
25. **createBlog** - `POST` [https://majorecomproject.onrender.com/ecommerce/v1/blog/createblog]
26. **updateBlog** - `PUT` [https://majorecomproject.onrender.com/ecommerce/v1/blog/updateblog/:id]
27. **deleteBlog** - `DELETE` [https://majorecomproject.onrender.com/ecommerce/v1/blog/delete/:id]

### Cupon APIs:
28. **getAllCupons** - `GET` [https://majorecomproject.onrender.com/ecommerce/v1/cupon/getall]
29. **getSingleCupon** - `GET` [https://majorecomproject.onrender.com/ecommerce/v1/cupon/get/:id]
30. **createCupon** - `POST` [https://majorecomproject.onrender.com/ecommerce/v1/cupon/create]
31. **updateCupon** - `PUT` [https://majorecomproject.onrender.com/ecommerce/v1/cupon/update/:id]
32. **deleteCupon** - `DELETE` [https://majorecomproject.onrender.com/ecommerce/v1/cupon/delete/:id]
33. **applyCupon** - `POST` [https://majorecomproject.onrender.com/ecommerce/v1/user/applycupon]

### Brand APIs:
34. **getAllBrands** - `GET` [https://majorecomproject.onrender.com/ecommerce/v1/brand/getallbrands]
35. **getSingleBrand** - `GET` [https://majorecomproject.onrender.com/ecommerce/v1/brand/get/:id]
36. **createBrand** - `POST` [https://majorecomproject.onrender.com/ecommerce/v1/brand/create]
37. **updateBrand** - `PUT` [https://majorecomproject.onrender.com/ecommerce/v1/brand/update/:id]
38. **deleteBrand** - `DELETE` [https://majorecomproject.onrender.com/ecommerce/v1/brand/delete/:id]
