export type RouteMap = {
  loginPage: string;
  home: string;
  writeNewBlog: string;
  allBlogs: string;
};

export const routeMap: {
  login: RouteMap;
  nonLogin: RouteMap;
} = {
  login: {
    loginPage: `/login`,
    home: `/home`,
    writeNewBlog: `/blogs/write`,
    allBlogs: `/blogs`,
  },
  nonLogin: {
    loginPage: `/login`,
    home: `/login`,
    writeNewBlog: `/login`,
    allBlogs: `/login`,
  },
};
