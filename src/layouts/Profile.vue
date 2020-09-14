<template>
  <article class="profile">
    <section class="profile__img">
      <img src="../assets/img/profile.jpg" alt="">
    </section>
    <section class="profile__content">
      <h3 class="profile__content-nickname">{{metaData.nickname}}</h3>
      <section class="profile__content-info">
        <ul>
          <li>
            <font-awesome-icon :icon="ICON_USER"/>
            {{metaData.name}}
          </li>
          <li>
            <font-awesome-icon :icon="ICON_MAIL"/>
            <a :href="`mailto:${metaData.mail}`">{{metaData.mail}}</a>
          </li>
          <li>
            <font-awesome-icon :icon="ICON_LOCATION"/>
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
                <font-awesome-icon :icon="getIcon(key)"/>
              </a>
            </li>
          </ul>
        </section>
      </section>
    </section>
  </article>
</template>

<script lang="ts">
  import { faGithub, faHackerrank, faInstagram } from '@fortawesome/free-brands-svg-icons'
  import { faAt, faMapMarkerAlt, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons'
  import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Profile',
  })
  export default class Profile extends Vue {
    ICON_USER: IconDefinition
    ICON_LOCATION: IconDefinition
    ICON_MAIL: IconDefinition

    ICON_GITHUB: IconDefinition
    ICON_INSTAGRAM: IconDefinition
    ICON_HACKERRANK: IconDefinition

    @Prop() metaData!: any

    constructor() {
      super()

      this.ICON_USER = faUser
      this.ICON_LOCATION = faMapMarkerAlt
      this.ICON_MAIL = faAt

      this.ICON_GITHUB = faGithub
      this.ICON_INSTAGRAM = faInstagram
      this.ICON_HACKERRANK = faHackerrank
    }

    getIcon(key: string): IconDefinition | null {
      switch (key) {
        case 'github':
          return this.ICON_GITHUB
        case 'instagram':
          return this.ICON_INSTAGRAM
        case 'hackerrank':
          return this.ICON_HACKERRANK
        default:
          return null
      }
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

    &__img {
      display: inline-block;
      text-align: center;

      img {
        border-radius: 50%;
        border: 5px solid var(--profile-img-border-color);
        width: 14%;
      }
    }

    &__content {
      background-color: var(--profile-bg-color);
      height: 180px;
      padding: 0 20px;
      border-radius: 10px;

      &-nickname {
        display: inline-block;
        margin-bottom: 1px;
      }

      &-info {
        font-size: 0.7rem;
        color: var(--post-list-text-color);

        ul > li {
          margin-right: 15px;

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

            .tag {
              margin-right: 4px;
              padding: 3px 7px;
              border-radius: 3px;
              background: var(--profile-img-border-color);
            }
          }
        }
      }

      &-contact {
        margin-top: 10px;
        float: right;

        a {
          color: inherit;
        }

        ul {
          display: flex;

          li {
            margin-right: 10px;
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
      height: 210px;
    }

    .profile__content-info {
      ul {
        display: inline-block;
      }
    }

  }
</style>
