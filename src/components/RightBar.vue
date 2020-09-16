<template>
  <section class="bar">
    <section class="bar__anchor" v-if="headings.length > 0">
      <h4>Contents</h4>
      <ul>
        <li v-for="head in subtitles" :key="head.value" :class="`depth-${head.depth}`">
          <a :href="head.anchor"> {{head.value}} </a>
        </li>
      </ul>
    </section>

    <section class="bar__recent" v-if="$static.recent.edges.length > 0">
      <h4>Recent Updated</h4>
      <ul>
        <li v-for="(node, index) in $static.recent.edges" :key="index">
          <g-link :to="node.node.path">
            {{node.node.title}}
          </g-link>
        </li>
      </ul>
    </section>

    <section class="bar__tags" v-if="$static.tags.edges.length > 0">
      <h4>Trending Tags</h4>
      <ul>
        <li v-for="{node} in $static.tags.edges" :key="node.title">
          <g-link :to="node.path">{{node.title}}</g-link>
        </li>
      </ul>
    </section>
  </section>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    name: 'RightBar',
    components: {},
  })
  export default class RightBar extends Vue {
    @Prop() headings!: any[]

    constructor() {
      super()
    }

    get subtitles() {
      // source: https://github.com/gridsome/gridsome.org/blob/master/src/templates/DocPage.vue
      // Remove h1, h4, h5, h6 titles
      return this.headings.filter(({ depth }) => [2, 3].includes(depth))
    }
  }
</script>

<static-query>
  query {
    recent: allPost(limit: 5) {
      edges {
        node {
          title
          path
        }
      }
    }
    tags: allTag {
      edges {
        node {
          title
          path
        }
      }
    }
  }
</static-query>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin: 0;
  }

  .bar {
    margin-top: 4rem;
    right: 10%;
    position: fixed;


    &__anchor, &__recent, &__tags {
      border-bottom: 1px solid var(--main-border-color);
      padding-bottom: 10px;
      margin-bottom: 55px;

      h4 {
        margin: 8px 0;
      }

      ul {
        max-width: 200px;
        padding-left: 10px;
        border-left: 5px groove white;
        font-size: 0.8rem;

        li {
          max-width: 200px;
          overflow-x: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    &__anchor {
      ul {
        li {
          &.depth-3 {
            font-size: 0.75rem;
            margin-left: 20px;
          }

          & > * {
            color: var(--post-list-text-color);

            &:hover {
              color: var(--app-font-color);
              transition: color 0.35s ease-in-out;
            }
          }
        }
      }
    }

    &__tags {
      ul {
        padding-left: 0;
        border: none;

        li {
          width: auto;
          max-width: none;
          display: inline-block;
          font-size: 1rem;
          margin-right: 4px;
          padding: 4px 6px;
          border-radius: 3px;
          border: 1px solid var(--tag-bg-color);
          cursor: pointer;

          &:hover {
            background: var(--tag-bg-color);
            transition: color 0.35s ease-in-out;
          }

          * {
            color: var(--app-font-color);
          }
        }
      }
    }

  }

  @media all and (max-width: 1200px) {
    .bar {
      display: none;
    }
  }
</style>
