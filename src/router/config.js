import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import NotFound from "@/views/NotFound.vue";
import Settings from "@/views/Settings.vue";
import ArticleDetails from "@/views/article/ArticleDetails.vue";
import ArticleAdd from "@/views/article/ArticleAdd.vue";
import ArticleEdit from "@/views/article/ArticleEdit.vue";
import ArchiveList from "@/views/archive/ArchiveList.vue";
import ArchiveDetails from "@/views/archive/ArchiveDetails.vue";
import CategoryList from "@/views/category/CategoryList.vue";
import CategoryDetails from "@/views/category/CategoryDetails.vue";
import TagList from "@/views/tag/TagList.vue";
import TagDetails from "@/views/tag/TagDetails.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/article/add",
    name: "ArticleAdd",
    component: ArticleAdd,
    meta: {
      needAuthentication: true,
    },
  },
  {
    path: "/article/:id",
    name: "ArticleDetails",
    component: ArticleDetails,
    props: true,
  },
  {
    path: "/article/:id/edit",
    name: "ArticleEdit",
    component: ArticleEdit,
    props: true,
    meta: {
      needAuthentication: true,
    },
  },
  {
    path: "/archive",
    name: "ArchiveList",
    component: ArchiveList,
  },
  {
    path: "/archive/:year/:month",
    name: "ArchiveDetails",
    component: ArchiveDetails,
    props: true,
  },
  {
    path: "/category",
    name: "CategoryList",
    component: CategoryList,
  },
  {
    path: "/category/:id/:categoryName",
    name: "CategoryDetails",
    component: CategoryDetails,
    props: true,
  },
  {
    path: "/tag",
    name: "TagList",
    component: TagList,
  },
  {
    path: "/tag/:id/:tagName",
    name: "TagDetails",
    component: TagDetails,
    props: true,
  },
  {
    path: "/user/settings",
    name: "UserSettings",
    component: Settings,
    meta: {
      needLogin: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

export default routes;
