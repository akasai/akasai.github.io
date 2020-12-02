<template>
  <g-link :to="post.path">
    <article class="post-preview">
    <span class="post-preview__title">
      <h3 id="category">{{Category}}</h3>
      <h1 id="title">{{post.title}}</h1>
      <h4 id="series" v-if="post.series_name">{{SeriesTitle}}</h4>
    </span>
      <p class="post-preview__content">
        {{post.description}}
      </p>
      <section class="post-preview__info">
      <span class="date">
        <Clock class="clock_icon"/>{{post.date}}
      </span>
        <span class="time-to-read">{{post.timeToRead}} min read</span>
      </section>
      <Tag :tagList="post.tags.map((t) => t.title)" :size="tagSize"/>
    </article>
  </g-link>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import Clock from '../assets/svg/clock.svg'
  import Tag from './Tag.vue'

  @Component({
    name: 'PostItem',
    components: {
      Tag,
      Clock,
    },
  })
  export default class PostItem extends Vue {
    @Prop() post!: any

    private tagSize: string

    constructor() {
      super()
      this.tagSize = 'medium'
    }

    get Category(): string {
      const sub = this.post.sub_category
      return `${this.post.category}${sub ? ` / ${sub}` : ''}`
    }

    get SeriesTitle(): string {
      return `${this.post?.series_name} #${this.post?.series_num}`
    }
  }
</script>

<style lang="scss" scoped>
  .post-preview {
    padding: 1.8rem 1rem;
    border-bottom: 1px solid var(--main-border-color);

    &:hover {
      cursor: pointer;
      background-color: var(--hover-bg-color);
      transition: all ease 0.25s;
    }

    &__title {
      margin: 5px 0;
      font-family: gugi;

      h3#category {
        font-size: 1.5rem;
        margin: 0 0 7px 7px;
        display: block;
        color: var(--category-font-color);
      }

      h1#title {
        font-size: 2.7rem;
        font-weight: bold;
        display: inline-block;
        color: var(--title-font-color);
      }

      h4#series {
        &:before {
          content: '|';
          margin: 0 5px;
        }

        font-size: 1.3rem;
        display: inline-block;
        margin: 5px 0;
        color: var(--series-font-color);
      }
    }

    &__content {
      font-size: 1.55rem;
      color: var(--app-font-color);
      margin: 5px 0 10px 0;
    }

    &__info {
      font-family: gugi;
      font-size: 1rem;
      color: var(--posting-info-font-color);
      display: inline-block;
      margin-bottom: 3px;

      .date {
        min-width: 60px;

        .clock_icon {
          vertical-align: text-bottom;
          margin-right: 3px;
          width: 1rem;
        }
      }

      .time-to-read {
        &:before {
          content: '·';
          margin: 0 5px;
        }
      }
    }
  }
</style>
