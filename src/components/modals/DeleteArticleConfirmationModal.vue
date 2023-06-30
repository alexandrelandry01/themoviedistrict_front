<template>
    <div>
        <div class="modal fade" id="deleteConfirmation">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Delete Article</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this article?</p>
                    </div>
                    <div class="modal-footer">
                        <form @submit.prevent="confirmDeleteArticle()" method="delete">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <input type="submit" class="btn btn-primary" data-bs-dismiss="modal" value="Confirm">                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DeleteArticleConfirmationModal',
    props: ['selectedArticleId'],
    methods: {
        confirmDeleteArticle() {
            this.$emit('confirmDeleteArticle');
        }
    }
}
</script>
<style>
    
</style>