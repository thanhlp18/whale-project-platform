export type RouteMap = {
  home: string;
  writeNewBlog: string;
  allBlogs: string;
};

export const routeMap: {
  login: RouteMap;
  nonLogin: RouteMap;
} = {
  login: {
    home: `/home`,
    writeNewBlog: `/blogs/write`,
    allBlogs: `/blogs`,
  },
  nonLogin: {
    home: `/home`,
    writeNewBlog: `/blogs/write`,
    allBlogs: `/blogs`,
  },
};
