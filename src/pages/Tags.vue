<template>
  <Layout>
    <section class="tags">
      <h1>Tags</h1>
      <section class="tags__content">
        <ul>
          <li v-for="{node} in $static.tags.edges">
            {{node.title}}
          </li>
        </ul>
      </section>
    </section>
  </Layout>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Tags',
  })
  export default class Tags extends Vue {
    constructor() {
      super()
    }
  }
</script>

<static-query>
  query {
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
  ul {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin: 0;
  }

  .tags {
    padding-top: 8rem;

    h1 {
      margin: 10px 0;
    }

    &__content {
      min-height: 500px;

      ul {
        width: 100%;

        li {
          width: auto;
          max-width: none;
          display: inline-block;
          font-size: 1rem;
          margin-right: 6px;
          padding: 5px 9px;
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
</style>
