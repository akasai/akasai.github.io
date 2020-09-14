<template>
  <g-link :to="post.path">
    <article class="post-preview">
      <span class="post-preview__title">
        <h1>{{post.title}}</h1>
        <h3>{{post.category}}</h3>
      </span>
      <p class="post-preview__content">
        {{post.description}}
      </p>
      <section class="post-preview__info">
        <span class="date">
          <font-awesome-icon :icon="ICON_CLOCK" class="clock_icon"/>{{post.date}}
        </span>
        <span class="time-to-read"><i>{{post.timeToRead}} min read</i></span>
      </section>
      <section class="post-preview__tag" v-if="post.tags.length">
        <ul>
          <li v-for="tag in post.tags">{{tag.title}}</li>
        </ul>
      </section>
    </article>
  </g-link>
</template>

<script lang="ts">
  import { faClock, IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    name: 'PostItem',
  })
  export default class PostItem extends Vue {
    ICON_CLOCK: IconDefinition

    @Prop() post!: any

    constructor() {
      super()
      this.ICON_CLOCK = faClock
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

  .post-preview {
    padding: 1rem;
    border-bottom: 1px solid var(--main-border-color);

    &:hover {
      cursor: pointer;
      background-color: var(--profile-bg-color);
      transition: all ease 0.25s;
    }

    &__title {
      display: flex;

      h1 {
        font-size: 1.55rem;
        margin-right: 15px;
        color: var(--title-color);
      }

      h3 {
        margin: 5px 0 0 0;
        color: var(--post-list-text-color);
      }
    }

    &__content {
      margin: 5px 0 10px 0;
      color: var(--app-font-color);
    }

    &__info {
      .date, .time-to-read {
        color: var(--post-list-text-color);
      }

      .date {
        font-size: .8rem;
        margin-right: 10px;
        min-width: 60px;
        display: inline-block;

        .clock_icon {
          width: 0.9rem;
          margin-right: 4px;
        }
      }

      .time-to-read {
        margin-left: 10px;
        font-size: .8em;
      }
    }

    &__tag {
      margin-top: 5px;
      color: inherit;

      ul > li {
        color: var(--app-font-color);
        font-size: 0.9rem;
        margin-right: 4px;
        padding: 3px 5px;
        border-radius: 3px;
        background: var(--tag-bg-color);
      }
    }
  }
</style>
