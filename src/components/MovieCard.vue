<template>
  <div class="movie__card">
    <div>
      <!-- <img
        class="movie__thumbnail"
        :srcset="`${posterPath(185)} 185w, ${posterPath(300)} 300w`"
        sizes="(max-width: 610px) 300px, (min-width: 610px) 185px"
      />-->
      <img class="movie__thumbnail" :src="posterPath(300)" alt="Thumbnail" />
    </div>
    <main class="movie-details">
      <header class="movie-details__header">
        <div class="movie-title">
          <h2 class="movie-title__content">{{movie.original_title}}</h2>
        </div>
        <div class="movie__date">{{releaseDate}}</div>
        <critic-porcentage class="movie-critic" :label="movie.vote_average"></critic-porcentage>
      </header>
      <article class="movie-overview">
        <p class="movie-overview__content">{{movie.overview || 'Sem sinopse...'}}</p>
        <div class="genres-chips">
          <chip v-for="genre in genres" :key="genre.id" :label="genre.name"></chip>
        </div>
      </article>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Chip from './Chip.vue'

import Movie from '@/model/Movie.interface'
import moment, { Moment } from 'moment'
import CriticPorcentage from './CriticPorcentage.vue'
import GENRES from '@/utils/genres'
@Component({
  components: {
    chip: Chip,
    'critic-porcentage': CriticPorcentage
  }
})
export default class MovieCard extends Vue {
  @Prop()
  private movie!: any;

  private posterPath (size: number): string {
    if (this.movie.poster_path) { return `https://image.tmdb.org/t/p/w${size}` + this.movie.poster_path }
    return 'https://via.placeholder.com/300x450'
  }

  private get genres () {
    return GENRES.filter(item => {
      return this.movie.genre_ids.includes(item.id)
    })
  }

  private get releaseDate (): string {
    let date: Moment = moment(this.movie.release_date, 'YYYY-MM-DD')
    return date.format('DD/MM/YYYY')
  }
}
</script>

<style scoped>
body {
  font-size: 16px;
}

.movie__card {
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
  /* max-height: 278px; */
  cursor: pointer;
}

.movie__thumbnail {
  display: block;
  height: 450px;
  width: 300px;
}

.movie-details {
  background-color: #ebebeb;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-grow: 1;
}

.movie-details__header {
  position: relative;
}

.movie-title {
  display: flex;
  align-items: flex-end;
  background-color: #126192;
  height: 60px;
  padding-left: 100px;
}

.movie-title__content {
  color: #64eae5;
  font-family: "Abel";
  font-weight: 300;
  font-size: 1.2rem;
  margin: auto 0;
  /* padding-bottom: 5px; */
  white-space: nowrap;
  max-height: 100%;
  overflow: hidden;
}

.movie__date {
  padding-top: 3px;
  padding-left: 100px;
  color: #9a9a9a;
  font-size: 16px;
  font-family: "Abel";
  font-weight: 300;
}

.movie-critic {
  position: absolute;
  top: 25%;
  margin-left: 15px;
}

.movie-overview {
  padding-top: 25px;
  padding-left: 30px;
  padding-right: 30px;
  /* max-height: 192px; */
  box-sizing: border-box;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
}

.movie-overview__content {
  margin: 0;
  font-size: 16px;
  font-family: "Lato";
  color: #4e4c4c;
  /* max-height: 115px; */
  overflow: hidden;
}

.genres-chips {
  margin: 15px -4px;
  overflow: hidden;
}

@media screen and (max-width: 610px) {
  .movie__card {
    max-width: 300px;
  }

  .movie-details {
    max-width: 300px;
  }
}

@media screen and (min-width: 610px) {
  .movie__card {
    max-width: 1100px;
    flex-wrap: nowrap;
  }

  .movie-details {
    max-height: 450px;
  }

  .movie-title__content {
    font-size: 25px;
  }

  .genres-chips {
    margin-top: auto;
  }
}

@media screen and (min-width: 800px) {
  .movie-title__content {
    font-size: 32px;
  }

  .movie-overview__content {
    overflow-y: scroll;
    max-height: 220px;
  }
}

</style>
