<template>
  <section class="bar">
    <section class="bar__anchor" v-if="headings.length > 0">
      <h4 class="title">Contents</h4>
      <ul>
        <li v-for="head in subtitles" :key="head.value" :class="`depth-${head.depth}`">
          <a :href="head.anchor"> {{head.value}} </a>
        </li>
      </ul>
    </section>

    <section class="bar__recent" v-if="$static.recent.edges.length > 0">
      <h4 class="title">Recent Updated</h4>
      <ul>
        <li v-for="(node, index) in $static.recent.edges" :key="index">
          <g-link :to="node.node.path">
            {{node.node.title}}
          </g-link>
        </li>
      </ul>
    </section>

    <section class="bar__tags" v-if="$static.tags.edges.length > 0">
      <h4 class="title">Trending Tags</h4>
      <ul>
        <li v-for="{node} in $static.tags.edges" :key="node.title">
          <g-link :to="node.path">{{node.title}}</g-link>
        </li>
      </ul>
    </section>

    <!-- ads 우측 -->
<!--    <Adsense ins-class="right-ads" data-ad-client="ca-pub-7791595479585064" data-ad-slot="5254846473"-->
<!--             data-full-width-responsive="yes"/>-->
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
  tags: allTag (order: ASC limit: 10) {
  edges {
  node {
  title
  path
  }
  }
  }
  }
</static-query>

<style lang="scss">
  .bar {
    margin-top: 1.2rem;
    /*  position: fixed;*/

    h4.title {
      font-size: 1.5rem;
      margin: 8px 0;
    }

    &__anchor, &__recent, &__tags {
      padding-bottom: 10px;
      margin-bottom: 40px;

      ul {
        display: inline-block;
        max-width: 250px;
        padding: 2px 10px;
        border-left: 2px solid white;
        font-size: 1.3rem;

        li {
          margin: 4px 0;
          max-width: 250px;
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
            font-size: 1.1rem;
            margin-left: 20px;
          }

          & > * {
            color: var(--posting-info-font-color);

            &:hover {
              color: var(--app-font-color);
              transition: color 0.35s ease-in-out;
            }
          }
        }
      }
    }

    &__recent {
      ul {
        li {
          & > * {
            color: var(--title-font-color);

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

        li {
          display: inline-block;
          margin-right: 4px;
          padding: 4px 6px;
          border-radius: 3px;
          border: 1px solid var(--tag-bg-color);
          cursor: pointer;

          &:hover {
            background: var(--tag-bg-color);
            color: var(--posting-info-font-color);
            transition: color 0.35s ease-in-out;
          }

          * {
            color: var(--app-font-color);
          }
        }
      }
    }
  }
  .right-ads {
    /*background: gray;*/
    /*width: 220px;*/
  }
</style>
