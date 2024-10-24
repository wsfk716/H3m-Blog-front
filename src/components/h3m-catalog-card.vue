<template>
  <div class="catalog-card">
    <div class="catalog-card-header">
      <div class="title">
        <svg class="catalog-icon" aria-hidden="true">
          <use xlink:href="#icon-kechengmulu"></use>
        </svg>
        <span>目录</span>
      </div>
      <div class="progress">{{ progress }}</div>
    </div>
    <div class="catalog-content">
      <div
        v-for="title in titles"
        :key="title.id"
        :class="['catalog-item', { active: title.id === currentTitle.id }]"
        @click="scrollToView(title.scrollTop)"
      >
        {{ title.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, nextTick } from "vue";

const props = defineProps({
  container: {
    type: String,
    default: ".article-details .article-content",
  },
});

const titles = reactive([]);
const currentTitle = reactive({});
const progress = ref(0);
const articleContainer = ref(null);
// 获取目录的标题
function getTitles() {
  let titles = [];
  let levels = ["h1", "h2", "h3"];

  let articleElement = articleContainer.value;
  if (!articleElement) {
    return titles;
  }
  console.log(articleElement);
  let elements = Array.from(articleElement.querySelectorAll("*"));
  // 调整标签等级
  let tagNames = new Set(elements.map((el) => el.tagName.toLowerCase()));
  for (let i = levels.length - 1; i >= 0; i--) {
    if (!tagNames.has(levels[i])) {
      levels.splice(i, 1);
    }
  }

  let serialNumbers = levels.map(() => 0);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    let tagName = element.tagName.toLowerCase();
    let level = levels.indexOf(tagName);
    if (level == -1) continue;

    let id = tagName + "-" + element.innerText + "-" + i;
    let node = {
      id,
      level,
      parent: null,
      children: [],
      rawName: element.innerText,
      scrollTop: element.offsetTop,
    };

    if (titles.length > 0) {
      let lastNode = titles.at(-1);

      // 遇到子标题
      if (lastNode.level < node.level) {
        node.parent = lastNode;
        lastNode.children.push(node);
      }
      // 遇到上一级标题
      else if (lastNode.level > node.level) {
        serialNumbers.fill(0, level + 1);
        let parent = lastNode.parent;
        while (parent) {
          if (parent.level < node.level) {
            parent.children.push(node);
            node.parent = parent;
            break;
          }
          parent = parent.parent;
        }
      }
      // 遇到平级
      else if (lastNode.parent) {
        node.parent = lastNode.parent;
        lastNode.parent.children.push(node);
      }
    }

    serialNumbers[level] += 1;
    let serialNumber = serialNumbers.slice(0, level + 1).join(".");

    node.isVisible = node.parent == null;
    node.name = serialNumber + ". " + element.innerText;
    titles.push(node);
  }

  return titles;
}

// 监听滚动事件并更新样式
window.addEventListener("scroll", function () {
  progress.value =
    parseInt((window.scrollY / document.documentElement.scrollHeight) * 100) +
    "%";

  let visibleTitles = [];

  for (let i = titles.length - 1; i >= 0; i--) {
    const title = titles[i];
    if (title.scrollTop <= window.scrollY) {
      if (currentTitle.id === title.id) return;

      Object.assign(currentTitle, title);

      // 展开节点
      setChildrenVisible(title, true);
      visibleTitles.push(title);

      // 展开父节点
      let parent = title.parent;
      while (parent) {
        setChildrenVisible(parent, true);
        visibleTitles.push(parent);
        parent = parent.parent;
      }

      // 折叠其余节点
      for (const t of titles) {
        if (!visibleTitles.includes(t)) {
          setChildrenVisible(t, false);
        }
      }

      return;
    }
  }
});

// 设置子节点的可见性
function setChildrenVisible(title, isVisible) {
  for (const child of title.children) {
    child.isVisible = isVisible;
  }
}

// 滚动到指定的位置
function scrollToView(scrollTop) {
  window.scrollTo({ top: scrollTop, behavior: "smooth" });
}

onMounted(() => {
  setTimeout(() => {
    articleContainer.value = document.querySelector(props.container);
    titles.push(...getTitles());
  }, 1000); // 延迟 1 秒，等待页面加载完成
});
</script>

<style lang="scss" scoped>
.catalog-card {
  background: white;
  border-radius: 8px;
  box-shadow: var(--card-box-shadow);
  padding: 20px 24px;
  width: 100%;
  margin-top: 25px;

  .catalog-card-header {
    display: flex;
    font-size: 18px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .title {
      align-items: center;
      display: flex;
      .catalog-icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
    .progress {
      color: #a9a9a9;
      font-style: italic;
      font-size: 130%;
    }
  }

  .catalog-card-header div > span {
    font-size: 17px;
    color: var(--text-color);
  }
  .catalog-content {
    max-height: calc(100vh - 120px);
    overflow: auto;
    margin-right: -24px;
    padding-right: 20px;
    .catalog-item {
      text-align: left;
      color: #666261;
      margin: 5px 0;
      line-height: 28px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      font-size: 14px;
      padding: 2px 6px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;

      -webkit-box-orient: vertical;
      &:hover {
        color: var(--theme-color);
      }
    }

    .active {
      background-color: var(--theme-color);
      color: white;

      &:hover {
        background-color: #0c82e9;
        color: white;
      }
    }
  }
}
</style>
