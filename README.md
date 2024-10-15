#InstaClone API Documentation

### User APIs:
1. **signup** - `POST` [https://instaclone-lf72.onrender.com/api/user/register]
2. **signin** - `POST` [https://instaclone-lf72.onrender.com/api/user/login]
3. **logout** - `POST` [https://instaclone-lf72.onrender.com/api/user/logout]
4. **IsLoggedIn** - `GET` [https://instaclone-lf72.onrender.com/api/user/isLoggedIn]
5. **getProfile** - `GET` [https://instaclone-lf72.onrender.com/api/user/profile/:id]
6. **editProfile** - `PATCH` [https://instaclone-lf72.onrender.com/api/user/profile/:id]
7. **suggestions** - `GET` [https://instaclone-lf72.onrender.com/api/user/suggested]
8. **FollowOrUnfollow**- `POST` [https://instaclone-lf72.onrender.com/api/user/followOrUnfollow/:id]

### Post APIs:
9. **addPost** - `POST` [https://instaclone-lf72.onrender.com/api/user/post/addPost]
10. **getAllPost** - `GET` [https://instaclone-lf72.onrender.com/api/user/post/]
11. **getUserPost** - `GET` [https://instaclone-lf72.onrender.com/api/user/post/getUserPost]
12. **deletePost** - `DELETE` [https://instaclone-lf72.onrender.com/api/user/post/delete/:id]
13. **addComment**- `POST` [https://instaclone-lf72.onrender.com/api/user/post/addComment/:id]
14. **getCommentsOfPost** `GET` [https://instaclone-lf72.onrender.com/api/user/post/getCommentsofPost/:id]
15. **Like** - `GET` [https://instaclone-lf72.onrender.com/api/user/post/:id/like]
16. **DisLike**- `GET` [https://instaclone-lf72.onrender.com/api/user/post/:id/dislike]

### Message APIs:
17. **sendMessage** - `POST` [https://instaclone-lf72.onrender.com/api/user/message//sendMessage/:id]
18. **getMessage** - `GET` [https://instaclone-lf72.onrender.com/api/user/message/getmessage/:id]

