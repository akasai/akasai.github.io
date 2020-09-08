<template>
  <div class="post-list">
<!--    <h1>{{year}}</h1>-->
    <PostItem :key="post.node.id" v-for="post in this.postsByYear" :post="post.node"/>
  </div>
</template>

<script>
  import {Component, Prop, Vue} from 'vue-property-decorator'
  import PostItem from '~/components/PostItem.vue'

  @Component({
    name: 'PostList',
    components: {
      PostItem
    }
  })
  export default class PostList extends Vue {
    @Prop() year

    constructor () {
      super()
    }

    get postsByYear () {
      const posts = this.$page.allPost.edges
      return posts.filter((post) => {
        return post.node.date.includes(this.year)
      })
    }
  }
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 2em;
    margin: 0;
  }

  .post-list {
    margin-top: 20px;
  }
</style>
