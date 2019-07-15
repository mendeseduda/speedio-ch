<template>
  <main class="movie">
    <div>
      <header class="movie-header">
        <h1 class="movie-header__title text-primary text-thin">{{movie.original_title}}</h1>
        <span class="movie-header__date">{{releaseDate}}</span>
      </header>
      <div class="movie-detail">
        <article class="movie-detail__content">
          <section>
            <h2 class="text-primary text-thin">Sinopse</h2>
            <hr class="divider" />
            <p class="movie-overview">{{movie.overview}}</p>
          </section>
          <section>
            <h2 class="text-primary text-thin">Informações</h2>
            <hr class="divider" />
            <div class="info-wrapper">
              <div class="movie-info">
                <h3>Situação</h3>
                <small>{{status}}</small>
              </div>
              <div class="movie-info">
                <h3>Idioma</h3>
                <small>{{language}}</small>
              </div>
              <div class="movie-info">
                <h3>Duração</h3>
                <small>{{duration}}</small>
              </div>
              <div class="movie-info">
                <h3>Orçamento</h3>
                <small>{{convertToCurrency(movie.budget)}}</small>
              </div>
              <div class="movie-info">
                <h3>Receita</h3>
                <small>{{convertToCurrency(movie.revenue)}}</small>
              </div>
              <div class="movie-info">
                <h3>Lucro</h3>
                <small>{{convertToCurrency(movie.revenue - movie.budget)}}</small>
              </div>
            </div>
          </section>
          <section class="other-info">
            <div class="genres-chips">
              <chip v-for="genre in movie.genres" :key="genre.id" :label="genre.name"></chip>
            </div>
          </section>
        </article>
        <aside class="movie-thumbnail">
          <img class="movie-thumbnail__content" :src="posterPath" alt />
        </aside>
        <critic-porcentage :big="true" class="movie-critic" :label="movie.vote_average"></critic-porcentage>
      </div>
    </div>
    <div class="movie-trailer" v-if="movie.videos.results.length">
      <iframe
        class="movie-trailer-wrapper"
        :src="videoPath()"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import moment, { Moment } from 'moment'
import axios from 'axios'

// import Movie from '@/model/Movie.interface'
import { languages } from '@/utils/languages'
import { movieStatus } from '@/utils/status'
import CriticPorcentage from '../components/CriticPorcentage.vue'
import Chip from '../components/Chip.vue'

import apiKey from '@/utils/apiKey'

@Component({
  components: {
    'critic-porcentage': CriticPorcentage,
    chip: Chip
  }
})
export default class MovieDetail extends Vue {
  private movie: any;

  public constructor () {
    super()
    this.movie = {
      budget: 0,
      revenue: 0,
      videos: {
        results: []
      }
    }
  }

  private created (): void {
    const id = this.$route.params.id
    axios
      .get(`/movie/${id}`, {
        baseURL: 'https://api.themoviedb.org/3',
        params: {
          api_key: apiKey,
          append_to_response: 'videos',
          language: 'pt-BR',
          region: 'BR'
        }
      })
      .then(response => {
        this.movie = response.data
      })
  }

  private get posterPath (): String {
    if (this.movie.poster_path) { return 'https://image.tmdb.org/t/p/w300' + this.movie.poster_path }
    return 'https://via.placeholder.com/300x450'
  }

  private get releaseDate (): string {
    let date: Moment = moment(this.movie.release_date, 'YYYY-MM-DD')
    return date.format('DD/MM/YYYY')
  }

  private get language () {
    return languages[this.movie.original_language]
  }

  private get duration () {
    const d = moment.duration(this.movie.runtime, 'minutes')
    const hours = Math.floor(d.asHours())
    const minutes = Math.floor(d.asMinutes()) - hours * 60
    return `${hours}h ${minutes}min`
  }

  private get status () {
    return movieStatus[this.movie.status]
  }

  private convertToCurrency (value: number) {
    return value
      .toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })
      .replace(/US\$\s/, '$')
  }

  private videoPath (): string {
    if (this.movie.videos) {
      return `https://www.youtube.com/embed/${this.movie.videos.results[0].key}`
    }
    return ''
  }
}
</script>

<style scoped>
* {
  font-family: "Abel";
}

.text-primary {
  color: #126192;
  margin-bottom: 0;
}

.text-thin {
  font-weight: 300;
}

.divider {
  border: 1px solid #64eae5;
}

.movie {
  max-width: 300px;
  margin: 0 auto;
  padding-top: 15px;
}

.movie-thumbnail {
  order: 1;
}

.movie-thumbnail__content {
  display: block;
}

.movie-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #e6e6e6;
}

.movie-header__title {
  text-align: center;
}

.movie-header__date {
  margin-top: auto;
  margin-bottom: auto;
  padding-bottom: 5px;
  color: #9a9a9a;
  font-size: 18.5px;
}

.movie-detail {
  display: flex;
  flex-wrap: wrap;
  background-color: #f2f2f2;
  position: relative;
}

.movie-detail__content {
  order: 2;
  flex-grow: 1;
  padding: 0 40px;
  overflow-y: scroll;
}

.movie-overview {
  font-size: 18px;
}

.genres-chips {
  display: inline-block;
  margin: 0 -4px;
}

.movie-critic {
  display: inline-block;
  margin-left: auto;
  margin-top: auto;
  position: absolute;
  right: 15px;
  bottom: 15px;
}

.info-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -12px;
}

.movie-info {
  margin: 12px;
}

.movie-info {
  text-align: center;
}

.movie-info > h3 {
  margin: 0;
  color: #126192;
  font-weight: 300;
}

.movie-info > small {
  font-size: 16px;
}

.other-info {
  display: flex;
  margin-top: 20px;
  margin-bottom: 90px;
  padding-right: 55px;
}

.movie-trailer {
  margin-top: 30px;
}

.movie-trailer-wrapper {
  width: 100%;
  height: 300px;
}

@media screen and (min-width: 610px) {
  .movie {
    max-width: 1100px;
  }

  .movie-header {
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    padding-left: 40px;
    padding-right: 20px;
  }

  .movie-header__date {
    margin-left: auto;
    padding: 0;
    line-height: 42px;
  }

  .movie-detail {
    flex-wrap: nowrap;
    max-width: 1100px;
  }

  .movie-detail__content {
    max-height: 450px;
  }

  .movie-critic {
    right: 315px;
    z-index: 3;
  }

  .movie-thumbnail {
    order: 3;
  }

  .movie-trailer-wrapper {
    height: 600px;
  }
}
</style>
