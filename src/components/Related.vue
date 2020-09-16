<template>
  <article class="related">
    <h3>Related Contents {{category ? `"${category}"` : `` }}</h3>
    <ul>
      <li v-for="{node} in randomList">
        <g-link :to="node.path">
          <section class="related__content">
            <h6>{{node.date}}</h6>
            <h3>{{node.title}}</h3>
            <p>{{getDescription(node.description)}}</p>
          </section>
        </g-link>
      </li>
    </ul>
  </article>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Related',
  })
  export default class Related extends Vue {
    @Prop() related!: any
    @Prop() category!: any

    constructor() {
      super()
    }

    get randomList() {
      return (this.related.edges || []).sort(() => Math.random() - Math.random())
        .slice(0, 3)
    }

    getDescription(str: string): string {
      const limit = 50
      return str.length >= limit ? `${str.slice(0, limit)} ...` : str
    }
  }
</script>

<style lang="scss">
  ul {
    list-style: none;
    display: inline-flex;
    padding: 0;
    margin: 0;
  }

  .related {
    margin: 50px 0 0 0;
    padding: 0 0 25px 0;
    border-bottom: 1px solid var(--main-border-color);

    h3 {
      margin: 0 0 10px 0;
    }

    ul {
      max-width: 800px;
      overflow-x: auto;

      li {
        min-width: 230px;
        margin-right: 10px;
      }
    }

    &__content {
      height: 130px;
      padding: 8px 15px;
      border-radius: 3px;
      border: 1px solid var(--main-border-color);
      box-shadow: 0 0 4px var(--profile-bg-color);

      h6 {
        color: var(--post-list-text-color);
        margin: 0;
      }

      h3 {
        color: var(--title-color);
      }

      p {
        max-height: 50px;
        color: var(--app-font-color);
      }

      &:hover {
        background: var(--related-content-color);
      }
    }
  }
</style>
