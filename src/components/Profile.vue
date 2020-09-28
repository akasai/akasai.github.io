<template>
  <article class="profile">
    <section class="profile__img">
      <img src="../assets/img/profile.jpg" alt="">
    </section>
    <section class="profile__content">
      <h2 class="profile__content-nickname">{{metaData.nickname}}</h2>
      <section class="profile__content-info">
        <ul>
          <li>
            <User/>
            {{metaData.name}}
          </li>
          <li>
            <Mail/>
            <a :href="`mailto:${metaData.mail}`">{{metaData.mail}}</a>
          </li>
          <li>
            <Map/>
            {{metaData.location}}
          </li>
        </ul>
      </section>
      <section class="profile__content-des">
        <p>{{metaData.description}}</p>
        <section class="profile__content-des-tag">
          <ul class="tags-section">
            <li class="tag" v-for="skill in metaData.skills">{{skill}}</li>
          </ul>
        </section>
        <section class="profile__content-contact">
          <ul>
            <li v-for="(link, key) of metaData.link">
              <a :href="link" target="_blank">
                <Github v-if="key == 'github'"/>
                <Hackerrank v-else-if="key == 'hackerrank'"/>
                <Leetcode class="fw" v-else-if="key == 'leetcode'"/>
                <Instagram v-else-if="key == 'instagram'"/>
              </a>
            </li>
          </ul>
        </section>
      </section>
    </section>
  </article>
</template>

<script lang="ts">
  import User from '../assets/svg/user.svg'
  import Mail from '../assets/svg/mail.svg'
  import Map from '../assets/svg/map.svg'
  import Hackerrank from '../assets/svg/hackerrank.svg'
  import Instagram from '../assets/svg/instagram.svg'
  import Leetcode from '../assets/svg/leetcode.svg'
  import Github from '../assets/svg/github.svg'
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Profile',
    components: {
      User,
      Mail,
      Map,
      Github,
      Hackerrank,
      Leetcode,
      Instagram,
    },
  })
  export default class Profile extends Vue {
    @Prop() metaData!: any

    constructor() {
      super()
    }
  }

</script>

<style lang="scss" scoped>
  ul {
    list-style: none;
    display: inline-flex;
    padding: 0;
    margin: 0;
  }

  .profile {
    margin-top: 4.5rem;
    background-color: var(--profile-bg-color);
    border-radius: 10px;

    &__img {
      padding-top: 10px;
      display: inline-block;
      text-align: center;

      img {
        border-radius: 50%;
        border: 5px solid var(--profile-img-border-color);
        width: 14%;
      }
    }

    &__content {
      width: 95%;
      padding: 0 20px;
      display: inline-block;

      &-nickname {
        font-size: 2rem;
        margin-top: 0;
        margin-bottom: 1px;
        display: inline-block;
      }

      &-info {
        font-size: 0.7rem;
        color: var(--post-list-text-color);

        ul > li {
          margin-right: 15px;

          svg {
            width: 0.7rem;
            margin-right: 3px;
            vertical-align: text-bottom;
          }

          a {
            color: inherit;
            padding-left: 2px;
          }
        }
      }

      &-des {
        p {
          margin: 8px 0;
        }

        &-tag {
          display: flex;
          font-size: 0.7rem;

          .tags-section {
            width: 100%;
            flex-wrap: wrap;

            .tag {
              margin-right: 4px;
              margin-bottom: 4px;
              padding: 3px 7px;
              border-radius: 3px;
              background: var(--profile-img-border-color);
            }
          }
        }
      }

      &-contact {
        margin: 10px 0;
        float: right;

        a {
          color: inherit;
        }

        ul {
          display: flex;

          li {
            width: 20px;
            margin-left: 10px;

            .fw {
              path {
                fill: var(--app-font-color);
              }
            }
          }
        }
      }
    }
  }

  @media all and (max-width: 500px) {
    .profile__img {
      img {
        border: 3px solid var(--profile-img-border-color);
        width: 25%;
      }
    }

    .profile__content {
      width: 90%;
    }

    .profile__content-info {
      ul {
        display: inline-block;
      }
    }

  }
</style>
