<template>
    <div>
        <h1>Page for articles</h1>
        <div>
            <ul>
                <li v-for="article in filteredArticlesPage" :key="article.id">
                    <div>
                        {{ article.title }}
                    </div>
                    <div>
                        {{ article.content }}
                    </div>
                    <div>
                        <router-link :to="'/EditArticle/' + article.id">edit</router-link>
                    </div>
                    <hr />
                </li>
            </ul>
        </div>
        <div>
            <nav aria-label="...">
                <ul class="pagination">
                    <li class="page-item" @click="previousPage()">
                        <a class="page-link" href="#" tabindex="-1">Previous</a>
                    </li>
                    <li v-for="(n, index) in amountOfPages" :key="index -1" @click="updatePage(index + 1)">
                        <a class="page-link" :class="{active: selectedPage == index + 1}" href="#" tabindex="index">{{ index + 1 }}</a>
                    </li>
                    <li class="page-item" @click="nextPage()">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>            
    </div>
</template>

<script>

import axios from 'axios'
import { BASE_API_URL, BASE_ARTICLE_SERVICE } from '../shared/config'

export default {
    name: 'AppHome',
    data() {
        return {
            articles: [],
            filteredArticlesPage: [],
            amountOfPages: Number,
            articlesPerPage: 5,
            onStartPageNumberIndex: 0,
            selectedPage: 1
        }
    },
    async beforeCreate() {
            await axios.get(BASE_API_URL + BASE_ARTICLE_SERVICE).then(response => {
            this.articles = response.data;
            this.amountOfPages = Math.ceil(this.articles.length / this.articlesPerPage);
            this.filteredArticlesPage = this.articles.slice(this.onStartPageNumberIndex, this.articlesPerPage);
        }).catch((error) => {
            throw(error);
        })
    },
    methods: {
        previousPage() {
            if (this.selectedPage > 1) {
                this.selectedPage--;
                this.updatePage(this.selectedPage);
            }
        },
        nextPage() {
            if (this.selectedPage < this.amountOfPages) {
                this.selectedPage++;
                this.updatePage(this.selectedPage);
            }
        },
        updatePage(pageNumber) {
            let beginningOfPage = (pageNumber - 1) * this.articlesPerPage;
            let endOfPage = pageNumber * this.articlesPerPage;
            this.filteredArticlesPage = this.articles.slice(beginningOfPage, endOfPage);
            this.selectedPage = pageNumber;
        }
    }
}
</script>

<style>
ul {
    list-style-type: none;   
}
</style>