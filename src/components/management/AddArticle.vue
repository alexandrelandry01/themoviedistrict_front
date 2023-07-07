<template>
    <div>
        <h1>Add Article</h1>
        <div>
            <div class="alert alert-warning" role="alert" v-show="!formIsValid">
                A field is missing
            </div>
            <div>
                <form @submit.prevent="addArticle()" method="post" v-show="displayMenu">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" class="form-control" id="title" placeholder="title..." v-model="article.title" @focus="closeAlert()">
                    </div>
                    <br />
                    <div class="form-group">
                        <textarea rows="10"  v-model="article.content" @focus="closeAlert()"></textarea>
                    </div>
                    <div class="form-group">
                        <input class="btn btn-primary" type="submit" value="Publish">
                    </div>
                </form>
                <div class="alert alert-success" v-show="articleSuccessfullyPublished === true">
                        Post successfully added!
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
            formIsValid: Boolean,
            articleSuccessfullyPublished: Boolean,
            displayMenu: true,
            article: {
                title: null,
                content: null
            }
        }
    },
    methods: {
        addArticle() {
            if (this.formIsComplete()) {
                this.formIsValid = true;
                axios.post(BASE_API_URL + BASE_ARTICLE_SERVICE + "/addarticle", this.article)
                .catch((error) => {
                    console.log(error);
                    throw(error);
                });
                this.articleSuccessfullyPublished = true;
                this.displayMenu = false;
                setTimeout(function() {
                    router.push({ path: '/'});
                }, 3000);
            } else {
                this.formIsValid = false;
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