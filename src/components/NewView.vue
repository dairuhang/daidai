<template>
  <div class="newview">
    <Top :message="message"></Top>
    <div class="wrap view">
      <div class="card">
        <div class="card-header">
          <h1 class="card-header-title">{{newsContent.title==""?"正在等着你来说第一句话":newsContent.title}}</h1>
        </div>
        <div class="card-body">{{newsContent.title==""?"你是第一个进来的，需要你来解锁这其中的私密":newsContent.body}}</div>
      </div>
      <div class="commentsAdd">
        <h1>发布留言</h1>
        <div class="edit_container">
          <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
          <button class="submitInfo" @click="chatAddContent()">留言</button>
        </div>
      </div>

      <ul class="comments">
        <h1>聊天评论内容</h1>
        <li v-for="(val,index) in newsview" :key="index">
          <div class="card">
            <div class="card-header">
              <h4 class="card-header-title">
                <div class="userAvatar">
                  <img v-if="val.userAvatar!=null" :src="userAvatar+val.userAvatar.slice(1)" alt>
                  <img v-else-if="val.userAvatar==null" :src="message.logo" alt>
                </div>
                <h3 class="userName">
                  <em>{{ val.userName==null?"游客":val.userName }}</em>
                  <em>{{ val.id }} | {{ val.createTime }}</em>
                </h3>
              </h4>
            </div>
            <div class="card-body" v-html="val.chatBody"></div>
          </div>
        </li>
        <h6 v-if="commentslength!=end" class="onloadMore" @click="onloadmore()">加载更多</h6>
        <p class="onloadend" v-else>我是有底线的</p>
      </ul>
    </div>
    <Foot :message="message"></Foot>
  </div>
</template>

<script>
import Top from './Top.vue'
import Foot from './Foot.vue'
import {quillEditor} from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import qs from 'qs'

  export default {
    name: "NewView",
    data() {
      return {
        id: this.$route.params.id,
        newsview: [],
        commentslength: 0,
        newsContent: {},
        userAvatar: "http://dairuhang.gz01.bdysite.com/",
        start: 0,
        end: 10,
        content: '',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'link', 'blockquote', 'code-block', 'image', 'video']        // toggled buttons
            ]
          },
          placeholder:'请留下你的足迹...'
        },
        str: '',
        message:{
        logo:require('../assets/logo.png'),
        title:"欢迎来到vue.js的世界",
        copyright:"版权所有@2018"
      }
      };
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },
    methods: {
      onloadmore() {
        let more = 10;
        if (this.commentslength - this.newsview.length < 10) {
          more = this.commentslength - this.newsview.length;
        }
        this.end = this.end += more;
        this.getChatall(0, this.end);
      },
      getChatall(start, end) {
        start == "" ? 0 : parseInt(start);
        end == "" ? 10 : parseInt(end);
        this.axios
          .get("http://dairuhang.gz01.bdysite.com/api/getchatAll.php?chatId=" + this.id )
          .then((res) => {
            this.commentslength = res.data.message.length;
            this.newsview = res.data.message.reverse().splice(start, end);
            this.newsContent = this.newsview[0];
          });
      },
      chatAddContent() {
        // let formData = this.content;
        let formData = {
          chatId:3,
          userId:135,
          content:this.content
        };
        let ly = qs.stringify(formData);
        this.axios.post('http://dairuhang.gz01.bdysite.com/api/messageAdd.php',ly).then(res=>{
          console.log(res);}).catch(res=>{
          console.log(res);});

        this.getChatall(0,this.end+1)

      },
      escapeStringHTML(str) {
        str = str.replace(/&lt;/g, '<');
        str = str.replace(/&gt;/g, '>');
        return str;
      },
      onEditorBlur() {
      }, // 失去焦点事件
      onEditorFocus() {
      }, // 获得焦点事件
      onEditorChange() {
        // console.log(this.content)
      } // 内容改变事件
    },
    components: {
      Top, Foot // quillEditor
    },
    created() {
      this.getChatall(this.start, this.end);
    },
  }
</script>

<style scoped>
  footer {
    padding: 25px 0;
    text-align: center;
  }
  .edit_container {
    height: 300px;
  }

  .quill-editor {
    height: 70% !important;
  }

  .ql-container {
    height: 70% !important;
  }

  .ql-editor {
    height: 70% !important;
  }

  .submitInfo {
    position: relative;
    top: 33px;
    left:825px;
    text-align: center;
    font-size: 15px;
    background: rgb(25, 99, 2);
    border-radius: 5px;
    padding: 5px 20px;
    color: #fff;
    cursor: pointer;
    margin: 15px auto;
    border: none;
    transition: all 600ms;
  }

  .submitInfo:hover {
    background: rgba(125, 199, 0, 1);
  }

  .view {
    width: 900px;
    margin:0 auto;
    margin-top: 40px;
  }

  .comments {
    display: flex;
    justify-content: flex-start;
    flex-flow: column;
    background: #eee;
    padding: 15px;
  }

  .comments h1,
  .commentsAdd h1 {
    font-size: 13px;
    font-weight: normal;
    margin-bottom: 35px;
    padding: 10px;
    border-bottom: 1px solid rgb(92, 163, 22);
    color: rgb(92, 163, 22);
  }

  .comments li {
    height: auto;
  }

  .card {
    background: #fff;
  }

  .card-body {
    min-height: 120px;
    font-size: 14px;
  }

  .card-header-title {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    padding: 15px 15px;
  }

  .comments * {
    transition: all 600ms;
  }

  .comments .userAvatar {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    margin: 0px 15px 0 0;
    box-shadow: 0px 0px 5px slategray;
  }

  .comments .userAvatar img {
    width: 100%;
  }

  .comments .userName {
    font-size: 14px;
    font-weight: normal;
    display: flex;
    width: calc(100% - 50px);
    justify-content: space-between;
  }

  .comments .userName em {
    font-style: normal;
    margin-right: 15px;
    line-height: 50px;
  }

  .comments .userName em:first-child {
    font-size: 17px;
    color: teal;
  }

  .onloadMore {
    text-align: center;
    font-size: 15px;
    background: rgb(25, 99, 2);
    border-radius: 5px;
    width: 150px;
    padding: 5px 0;
    color: #fff;
    cursor: pointer;
    margin: 15px auto;
  }

  .onloadMore:hover {
    background: rgba(125, 199, 0, 1);
  }

  .onloadend {
    text-align: center;
    text-decoration: underline;
  }
</style>