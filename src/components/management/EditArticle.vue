<template>
    <div>
        <h1>Edit Article</h1>
        <div>
            <div class="alert alert-warning" role="alert" v-show="!formIsValid">
                A field is missing
            </div>
            <div>
                <form @submit.prevent="editArticle()">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" class="form-control" id="title" placeholder="title..." v-model="article.title">
                    </div>
                    <br />
                    <div class="form-group">
                        <textarea rows="10" v-model="article.content"></textarea>
                    </div>
                    <div class="form-group">
                        <input class="btn btn-primary" type="submit" value="Save">
                    </div>
                </form>
                <div class="alert alert-success" v-show="articleSuccessfullyEdited === true">
                    Post successfully edited!
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import { BASE_API_URL, BASE_ARTICLE_SERVICE } from '@/shared/config'
import router from '../../router'

export default {
    data() {
        return {
            articleId: this.$route.params.id,
            article: Object,
            formIsValid: true,
            articleSuccessfullyEdited: Boolean,
            displayMenu: true
        }
    },
    beforeCreate() {
        if (this.$store.state.isAdmin === null || this.$store.state.isAdmin === false) {
            router.push({ path: '/404'});
        }
    },
    async created() {
        await axios.get(BASE_API_URL + BASE_ARTICLE_SERVICE + "/" + this.articleId).then(response => {
            this.article = response.data;
        }).catch((error) => {
            throw(error);
        })
    }, 
    methods: {
        editArticle() {
            if (this.formIsComplete) {
                axios.put(BASE_API_URL + BASE_ARTICLE_SERVICE + "/updatearticle/" + this.articleId, this.article, {
                    headers: {
                        "Authorization": `Bearer ${this.$store.state.token}`
                    }
                }).then(() => {
                    this.formIsValid = true;
                    this.articleSuccessfullyEdited = true;
                    this.displayMenu = false;
                    setTimeout(function () {
                        router.push({ path: '/' });
                    }, 3000);
                })
                .catch((error) => {
                    throw(error);
                });
            }
        },
        formIsComplete() {
            return this.article.title !== null && this.article.content !== null &&
                   this.article.title !== '' && this.article.content !== '' &&
                   (typeof this.article.title !== 'undefined') && (typeof this.article.content !== 'undefined');
        },
        closeAlert() {
            this.formIsValid = true;
        }
    }
}
</script>
<style scoped>
input[type=text] {
    margin:auto;
    width: 50%;
}

textarea {
    width: 50%;
}

.alert {
    width: 50% !important;
    display: inline-block;
}    
</style>