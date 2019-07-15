<template>
  <div class="home">
    <header class="header-search">
      <input
        class="search-movie__textfield"
        type="text"
        placeholder="Busque um filme por seu nome"
        v-model="searchTerm"
        @input="searchMovies"
      />
    </header>
    <section>
      <h2 class="advice" v-if="movies.length === 0">Procure por algum filme!</h2>
      <movie-card
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @click.native="detailMovie(movie.id)"
      ></movie-card>
    </section>
    <section>
      <div class="pagination">
        <div class="page" v-for="i in pages" :key="i" :class="{'page--active': paginator === i}">
          <span class="page__number" @click="goToPage(i)">{{i}}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import _ from 'lodash'
import axios from 'axios'

import MovieCard from '../components/MovieCard.vue'
// import Movie from '../model/Movie.interface'

import apiKey from '@/utils/apiKey'
@Component({
  components: {
    'movie-card': MovieCard
  }
})
export default class Home extends Vue {
  private moviesWrapper: any[];
  private searchTerm: string;
  private searchArea: string = 'Nome';
  private page: number;
  private cont: number;
  private paginator: number;
  private total: number;

  public constructor () {
    super()
    this.moviesWrapper = []
    this.searchTerm = ''
    this.page = 1
    this.cont = 0
    this.paginator = 1
    this.total = 0
  }

  private created () {
    this.searchMovies = _.debounce(this.searchMovies, 500)
  }

  private searchMovies (): void {
    this.page = 1
    this.cont = 0
    this.paginator = 1
    this.getMovies()
  }

  private getMovies (): void {
    axios
      .get('/search/movie', {
        baseURL: 'https://api.themoviedb.org/3',
        params: {
          api_key: apiKey,
          query: this.searchTerm,
          page: this.page,
          language: 'pt-BR',
          region: 'BR'
        }
      })
      .then(response => {
        this.total = response.data.total_results
        this.moviesWrapper = response.data.results
      })
  }

  private detailMovie (id: number): void {
    this.$router.push({
      name: 'movie',
      params: { id: String(id) }
    })
  }

  private goToPage (page: number) {
    this.cont = page - this.paginator + this.cont - 1
    if (this.cont < 0) {
      this.cont = 4 + this.cont
    }
    this.paginator = page
    if (this.cont >= 4 || (page - 1) % 4 === 0) {
      this.cont = this.cont === 0 ? 0 : this.cont - 3
      this.page++
      this.getMovies()
    } else {
      this.cont++
    }
  }

  private get movies (): any[] {
    return this.moviesWrapper.slice(this.cont * 5, (this.cont + 1) * 5)
  }

  private get pages (): number[] {
    const pages = []
    for (
      let index = this.paginator - 2;
      index < this.paginator + 3 && index <= Math.ceil(this.total / 5);
      index++
    ) {
      if (index > 0) {
        pages.push(index)
      }
    }
    return pages
  }
}
</script>

<style scoped>
.home {
  padding-top: 20px;
  padding-bottom: 20px;
}

.header-search {
  display: flex;
  justify-content: center;
}

.search-movie__textfield {
  width: 100%;
  display: block;
  /* margin: 0 auto; */
  border-radius: 28px;
  border: 0;
  background-color: #ebebeb;
  height: 40px;
  padding-left: 25px;
  box-sizing: border-box;
  font-family: "Lato";
  color: #126191;
  font-size: 15px;
}

.search-movie__textfield:focus {
  outline: 0;
}

.search-movie__textfield::placeholder {
  font-family: "Lato";
  font-size: 15px;
  color: #126191;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

.page {
  display: inline-block;
  margin: 0 7px;
  cursor: pointer;
}

.page__number {
  color: #126191;
  font-size: 20px;
  font-family: "Abel";
}

.page--active {
  border-radius: 50%;
  border: 2px solid #126191;
  box-sizing: border-box;
}

.page--active > .page__number {
  background-color: #126191;
  color: #64e6d6;
  border-radius: 50%;
  border: 3px solid #64e6d6;
  width: 35px;
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
}

.advice {
  font-family: "Abel";
  font-weight: 300;
  text-align: center;
}

@media screen and (max-width: 610px) {
  .header-search {
    padding: 0 20px;
  }
}

@media screen and (min-width: 610px) {
  .search-movie__textfield {
    max-width: 1100px;
  }
}
</style>
