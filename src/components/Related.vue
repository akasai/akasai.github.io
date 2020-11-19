<template>
  <section class="related">
    <h3 class="related__title">{{category ? `"${category}"` : `` }} Related Contents</h3>
    <article class="related__wrapper">
      <ul>
        <li v-for="{node} in randomList">
          <g-link :to="node.path" :title="node.title">
            <section class="related__wrapper__content">
              <h6 id="date">{{node.date}}</h6>
              <h3 id="title">{{node.title}}</h3>
              <p id="des">{{getDescription(node.description)}}</p>
            </section>
          </g-link>
        </li>
      </ul>
    </article>
  </section>
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
      const limit = 40
      return str.length >= limit ? `${str.slice(0, limit)} ...` : str
    }
  }
</script>

<style lang="scss">
  .related {
    &__title {
      font-size: 1.5rem;
      margin: 15px 0;
    }

    &__wrapper {
      margin: 0;
      padding: 0 0 25px 0;
      border-bottom: 1px solid var(--main-border-color);

      ul {
        max-width: var(--width-size);
        overflow-x: auto;

        li {
          width: 230px;
          margin-right: 10px;
        }
      }

      &__content {
        height: 120px;
        padding: 10px 15px;
        border-radius: 3px;
        border: 1px solid var(--main-border-color);

        h6#date {
          color: var(--posting-info-font-color);
          font-size: 1.2rem;
          margin: 0;
        }

        h3#title {
          color: var(--title-font-color);
          font-size: 1.7rem;
          margin: 0 0 10px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        p#des {
          max-height: 50px;
          font-family: bae;
          font-size: 1.75rem;
          color: var(--app-font-color);
        }

        &:hover {
          background: var(--related-content-hover-bg-color);
        }
      }
    }
  }

  @media all and (max-width: 500px) {
    .related__wrapper {
      overflow-x: scroll;
    }
  }
</style>
