<template>
    <div>
        <div>Папка {{currentData.name}} {{currentData.description}}:</div>
        <VButton v-if="!isRoot" :on-click="closeFolder"><--</VButton>
        <VSpinner v-if="!elements"/>
        <div class="files" v-else>
            <div class="files_items">
                <div v-if="!elements.length">Папка не содержит элементов</div>
                <div v-else>
                    <hr>
                    <div>Папки:</div>
                    <div class="folder" v-for="folderData of elements.filter(e => !e.path)">
                        <div>{{folderData.name}} id: {{folderData.id}}</div>
                        <VButton
                            :on-click="() => loadSubFolder(folderData)"
                            :key="folderData.id"
                        >открыть</VButton>
                    </div>
                    <hr>
                    <div>Файлы:</div>
                    <VFile
                        v-for="fileData of elements.filter(e => e.path)"
                        :data="fileData"
                        :key="fileData.id"
                    />
                    <hr>
                </div>
            </div>
            <div class="files_actions">
                <hr>
                <VForm
                    title="Добавить файл"
                    handler-title="загрузить"
                    :handler="this.uploadFile"
                    :fields="[
                        {
                            name: 'name',
                            validator: (e) => e.length > 0,
                            placeholder: 'data.csv',
                            label: 'Имя файла',
                        },
                        {
                            name: 'description',
                            validator: (e) => e.length > 0,
                            placeholder: '',
                            label: 'Описание',
                        },
                        {
                            name: 'files',
                            validator: () => true,
                            placeholder: '',
                            label: 'Файл',
                            type: 'file'
                        },
                    ]"
                />
                <hr>
                <VForm
                    title="Создать новую папку"
                    handler-title="создать"
                    :handler="this.createSubFolder"
                    :fields="[
                        {
                            name: 'name',
                            validator: (e) => e.length > 0,
                            placeholder: '',
                            label: 'Имя папки',
                        },
                    ]"
                />
                <hr>
                <VForm
                    title="Поделиться файлом/папкой с пользователем"
                    handler-title="поделиться"
                    :handler="this.shareWithUser"
                    :fields="[
                        {
                            name: 'otherUserId',
                            validator: (e) => /^\d+$/.test(e),
                            placeholder: '',
                            label: 'id пользователя',
                        },
                        {
                            name: 'fileId',
                            validator: (e) => e.length > 0,
                            placeholder: '',
                            label: 'id файла/папки',
                        },
                    ]"
                /><hr>
                <VForm
                    title="Поделиться файлом/папкой с группой"
                    handler-title="поделиться"
                    :handler="this.shareWithGroup"
                    :fields="[
                        {
                            name: 'groupId',
                            validator: (e) => /^\d+$/.test(e),
                            placeholder: '',
                            label: 'id группы',
                        },
                        {
                            name: 'fileId',
                            validator: (e) => e.length > 0,
                            placeholder: '',
                            label: 'id файла/папки',
                        },
                    ]"
                />
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {loadFiles} from "../store/store";
    import VForm from "./VForm";
    import VButton from "./VButton";
    import VSpinner from "./VSpinner";
    import VFile from "./VFile";
    import {errHandler} from "../js/utils";

    export default {
        name: "Files",
        components: {VButton, VForm, VSpinner, VFile},
        data: function () {
            return {
                elements: null,
                currentData: {
                    id: null,
                    name: 'root',
                    description: '',
                    parentData: null,
                },
            }
        },
        methods: {
            loadSubFolder: function(folderData) {
                folderData.parentData = this.currentData;
                this.currentData = folderData;
                this.reloadData();
            },
            closeFolder: function() {
                this.currentData = this.currentData.parentData;
                this.reloadData();
            },
            createSubFolder: function (data) {
                let params = {
                    session: this.$store.state.session,
                    name: data.name,
                };

                if (this.currentData.id)
                    params.parent = this.currentData.id;

                axios.post('files/createFolder', {}, {params: params})
                .then(this.reloadData)
                .catch(errHandler)
            },
            uploadFile: function(data) {
                let formData = new FormData();
                formData.append('file', data.files[0]);
                let params = {
                    session: this.$store.state.session,
                    name: data.name,
                    description: data.description,
                };

                if (this.currentData.id)
                    params.parent = this.currentData.id;

                axios.post('files/upload', formData, {
                    headers: {'Content-Type': 'multipart/form-data'},
                    params: params
                })
                .then(this.reloadData)
                .catch(errHandler)
            },
            shareWithUser: function(data) {
                axios.post('files/shareWithUser', {}, {
                    params: {
                        session: this.$store.state.session,
                        ...data
                    }
                })
                .catch(errHandler)
            },
            shareWithGroup: function(data) {
                axios.post('files/shareWithGroup', {}, {
                    params: {
                        session: this.$store.state.session,
                        ...data
                    }
                })
                .catch(errHandler)
            },
            reloadData: function () {
                this.elements = null;
                return loadFiles(this.currentData.id).then(data => this.elements = data).catch(errHandler);
            }
        },
        computed: {
            isRoot: function () {
                return this.currentData.parentData === null;
            },
        },
        beforeMount: function () {
            this.reloadData();
        }
    }
</script>

<style scoped>
    .files {
        display: flex;
        padding: 15px;
    }

    .files_items {
        width: 500px;
        margin-right: 40px;
    }

    .folder {
        border: solid 1px #000;
        padding: 15px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>