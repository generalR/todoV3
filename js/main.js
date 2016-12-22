var App = {
  init: function() {
      TodoList.cacheDom();
      TodoList.bindEvents();
      TodoList.render();
  },
};

var TodoList = {
    todos: [],
    storeTodo: function (todoText){
        this.todos.push({
          todoText: todoText,
          completed: false,
          id: id.generateId(),
        });
      },
      cacheDom: function() {
              this.$el = $('#todoListMoudule');
              this.template = this.$el.find('#todoList-template').html();
              this.$button = this.$el.find('#addTodoButton');
              this.$input = this.$el.find('#addTodoInput');
              this.$toggleAll = this.$el.find('#toggle-all');
              this.$ul = this.$el.find('ul');

      },
      bindEvents: function() {
              this.$button.on('click', this.createTodo.bind(this));
              this.$ul.delegate('div.del', 'click', TodoList.deleteTodo.bind(this));
              this.$toggleAll.on('change', this.toggleAll.bind(this));
              this.$ul.on('change', '.toggle', this.toggle.bind(this));
              this.$ul.on('dblclick', 'label', this.edit.bind(this));
              //this.$ul.delegate('.edit', 'focusout', this.changeTodo.bind(this));
              this.$ul.on('focusout', '.edit', this.changeTodo.bind(this));
      },
      render: function() {
             var data = {
                 todos: this.todos,
             };
             var compileTemplate = Handlebars.compile(this.template);
             this.$ul.html(compileTemplate(data));
      },
      indexFromEl: function(el){

        // inkommande parameter är ett element ifrån #todoListMoudule div och
		      // returnerar motsvarande index i 'todos' arrayen
          var id = $(el).closest('li').data('id');
          var todos = this.todos;
          var i = todos.length;

          //while (i--) returnerar true sålänge i > 0
          while (i--) {
            //jämför detta index med det genererade
            if (todos[i].id === id) {
              return i;
            }
          }
      },
      deleteTodo: function(event) {
        var correspondingIndex = this.indexFromEl(event.target);
        var i = this.$ul.find('li').index(correspondingIndex);
        this.todos.splice(i, 1);
        this.render();
    },
    createTodo: function(event){
      var addTodoTextInput = this.$input.val().trim();
      if(addTodoTextInput === "" || null){

      }else{
        this.storeTodo(addTodoTextInput);
        this.render();
        this.$input.val("");
      }
    },
    edit: function(event){

      var $input = $(event.target).closest('li');
      $input.addClass('edit');
      if($input.index() % 2) {


        $input.focus();
      }
    },
    changeTodo:function(event){
      var $input = $(event.target).closest('li');
      var el = event.target;
      var $el = $(el);
      var val = $el.val().trim();
      var correspondingIndex = this.indexFromEl(event.target);
      this.todos[correspondingIndex].todoText = val;
      val ="";
      this.render();
      $input.removeClass('edit');

    },
    //ta in event och kör ->this.indexFromEl(event.target);
    toggle: function(event){
    var index = this.indexFromEl(event.target);
    var todo = this.todos[index];
       if(todo.completed === false){
         todo.completed = !todo.completed;
         this.render();
    }else if(todo.completed === true){
      todo.completed = !todo.completed;
      this.render();
    }
  },
  toggleAll: function(){
    var totalTodos = this.todos.length;
    var completedTodos = 0;
//Loopa ingeom för att kolla varje todos completed property
    this.todos.forEach(function(todo) {
      //console.log(todos[i].completed);
        if(todo.completed === true){
          completedTodos++;
          console.log(completedTodos);
        }
      });
      this.todos.forEach(function(todo) {
        if(totalTodos === completedTodos){
          todo.completed = false;
      }else{
        todo.completed = true;
      }
    });
    this.render();
  }
};

var id = {
  generateId: function(){
    var id = Math.floor((Math.random() * 100) + 1);
    return id;
  }
};

//hämta först upp inputen i handlers -> skicka till todoList.addTodo
var handlers = {
  addTodo: function(){
  //var addTodoTextInput = $("#addTodoTextInput").val();
    var addTodoTextInput = this.$input.val();
    console.log(addTodoTextInput);
    TodoList.addTodo(addTodoTextInput);
    //$("#addTodoTextInput").val("");
    //view.displayTodos();

    this.todos.push(this.$input.val());
    TodoList.render();
    this.$input.val('');
  }
};

App.init();
