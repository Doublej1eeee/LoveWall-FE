// 从pinia库中导入createPinia函数。它是用于创建pinia实例的。
import { createPinia } from "pinia";

// 从pinia-plugin-persistedstate库中导入piniaPluginPersistedstate。这是一个pinia的插件，使pinia状态持久化，即在页面刷新时状态仍然存在。
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// 使用createPinia函数创建一个新的pinia实例。
const pinia = createPinia();

// 为pinia实例添加piniaPluginPersistedstate插件。这样，通过这个pinia管理的状态将会是持久化的。
pinia.use(piniaPluginPersistedstate);

// 导出pinia实例，这样在其他文件中可以导入并使用。
export default pinia;
