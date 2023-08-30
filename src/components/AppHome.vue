<template>    
    <div>
        <div>
            <br />
            <ul>
                <li v-for="article in filteredArticlesPage" :key="article.id">
                    <div>
                        {{ article.title }}
                    </div>
                    <div>
                        {{ article.content }}
                    </div>
                    <br />
                    Published on : {{ article.dateTime }}
                    <br /><br />
                    <div v-if="this.$store.state.isAdmin === true">
                        <router-link :to="'/EditArticle/' + article.id">
                            <div class="btn btn-primary">Edit</div>
                        </router-link>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deleteConfirmation" @click="updateSelectedArticle(article.id)">Delete</button>
                    </div>
                    <hr />
                </li>
            </ul>
            <DeleteArticleConfirmationModal :selectedArticleId="this.selectedArticleId" @confirmDeleteArticle="deleteArticle()"></DeleteArticleConfirmationModal>
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
import DeleteArticleConfirmationModal from '../components/modals/DeleteArticleConfirmationModal.vue'

export default {
    name: 'AppHome',
    components: {
        DeleteArticleConfirmationModal
    },
    data() {
        return {
            articles: [],
            filteredArticlesPage: [],
            amountOfPages: Number,
            articlesPerPage: 5,
            onStartPageNumberIndex: 0,
            selectedPage: 1,
            selectedArticleId: undefined
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
        },
        deleteArticle() {
            axios.delete(BASE_API_URL + BASE_ARTICLE_SERVICE + "/deletearticle/" + this.selectedArticleId, {
                headers: {
                    "Authorization": `Bearer ${this.$store.state.token}`
                }
            })
            .then(response => {
                this.selectedArticleId = undefined;
                this.reloadArticles();
                this.updatePage(1);
            })
            .catch((error) => {
                throw(error);
            });
        },
        updateSelectedArticle(id) {
            this.selectedArticleId = id;
        },
        async reloadArticles() {
            await axios.get(BASE_API_URL + BASE_ARTICLE_SERVICE).then(response => {
            this.articles = response.data;
            this.amountOfPages = Math.ceil(this.articles.length / this.articlesPerPage);
            this.filteredArticlesPage = this.articles.slice(this.onStartPageNumberIndex, this.articlesPerPage);
        }).catch((error) => {
            throw(error);
        });
        }
    }
}
</script>

<style>
ul {
    list-style-type: none;   
}
</style>