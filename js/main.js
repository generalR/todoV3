/*-----krav
blur 247
change 282
click 260
dbclick 246, 276
focus 246, 272
focus in 274
focus out 274
haschange 286 426
keyup - 280

Event bubbeling - 260
delegation 266, 330

//spara till localStorage
//Chainga anrop

/*    init: function() {
        this.cacheDom();
        this.bindEvents();
        this.render();
    },*/

var App = {
  //addTodo, deleteTodo
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
              this.$button = this.$el.find('#addTodoButton');
              this.$input = this.$el.find('input');
              this.$ul = this.$el.find('ul');
              this.template = this.$el.find('#todoList-template').html();
      },
      bindEvents: function() {
              this.$button.on('click', this.createTodo.bind(this));
              this.$ul.delegate('i.del', 'click', TodoList.deleteTodo.bind(this));
      },
      render: function() {
             var data = {
                 todos: this.todos,
             };
             var compileTemplate = Handlebars.compile(this.template);
             this.$ul.html(compileTemplate(data));
      },
      indexFromEl: function(e){
        // accepts an element from inside the `.todoListMoudule` div and
		      // returns the corresponding index in the `todos` array
        this.todos.forEach(function(todo, position){
          /*if(todo.id ===){
            console.log(todo.id);
          } */
        });
          //todoLi.id = position;
          //console.log(todo);
        //});
        //var id = this.$el.closest('li').data('id');
        //console.log(id);
      },
      deleteTodo: function(event) {
        var $remove = $(event.target).closest('li');
        //jämför detta index med det genererade
        var i = this.$ul.find('li').index($remove);

        this.todos.splice(i, 1);
        this.render();
    },
    createTodo: function(e){
      //this.todos.push(this.$input.val());
      //vill sätta ett id på varje todo
      var addTodoTextInput = this.$input.val();
      this.storeTodo(addTodoTextInput);
      this.render();
      this.indexFromEl();
      this.$input.val("");
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

/*
var todoList = {
  todos: [],
addTodo: function (todoText){
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
  },
changeTodo: function(position, todoText){
    view.todos[position].todoText = todoText;
    view.displayTodos();
  },
  deleteTodo: function(position){
    this.todos.splice(position, 1);
    view.displayTodos();
  },
  toggleCompleted: function(position){
    //! takes the opposit of what comes after it

    //sparar en ref till den specifika todo vi är intresserade av
    var todo = this.todos[position];
    //tänk så här: 1 På vänster sida hämtar vi todo.completed.
    // 2. Sätt samma värde på höger sida: todo.completed = todo.completed.
    // 3. sätt bang-operator framför på höger sida för att flippa värdet !todo.completed.
    todo.completed = !todo.completed;
    view.displayTodos();
  },
  toggleAll: function(){
*/


/*------------------------------------------------*/
    //Loopa ingeom för att kolla varje todos completed property
/*
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    for(var i = 0; i < totalTodos; i++ ){
      if(this.todos[i].completed === true){
      completedTodos++;
      }
    }
*/


/*--------------------------------------------------*/

    /*if everthing is true -> make everthing fasle*/
/*
    if(completedTodos === totalTodos){
      for(var i = 0; i < totalTodos; i++){
        this.todos[i].completed = false;
      }
    }else{
      //if everthing is false -> make everthing true
        for(var i = 0; i < totalTodos; i++){
          this.todos[i].completed = true;
        }
    }
    this.displayTodos();
  }
};
*/
/*
$('#todoList')
      .on('change', '.toggle', this.toggle.bind(this))
      .on('dblclick', 'label', this.edit.bind(this))
      .on('keyup', '.edit', this.editKeyup.bind(this))
      .on('focusout', '.edit', this.update.bind(this))
      .on('click', '.destroy', this.destroy.bind(this));
//$('#addTodoButton').on('click', handlers.addTodo.bind(this));
//	$('#addTodoButton').on('keyup', handlers.addTodo.bind(this));
$('#addTodoButton').on('click', function(){
  handlers.addTodo.call(this);
  //handlers.addTodo.bind(this);
});
$('#todoList').on('click', 'button', function(e){
  //console.log(this);
  handlers.deleteTodo.call(this);
});
$('#deleteButton').on('click', function(){

  //handlers.addTodo.bind(this);
});
*/
/*
var handlers = {
  addTodo: function(event){
  var addTodoTextInput = $("#addTodoTextInput").val();
    todoList.addTodo(addTodoTextInput);
    $("#addTodoTextInput").val("");
    view.displayTodos();
  },
  deleteTodo: function(e){
      var target = $( event.target );
      console.log(target);
      var ul = $("ul").closest("li");
      //console.log(ul);
      //view.displayTodos();
    },
    edit: function() {

    }
};

var view = {
  displayTodos: function(){
    $( "#todoList" ).empty();
    todoUl = $("#todoList");

    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement("li");
      //var todoLi = $('<li></li>');
      todoLi.id = position;


      todoLi.append(todo.todoText);
      //console.log(this.createDeleteButton() );
        var deleteButton = $('<button id=deleteButton>Delete</button>');
      deleteButton.appendTo(todoLi);

      console.log(todoLi);
      todoUl.append(todoLi);

    },this);

    //console.log(todoList.todos);
    if(todoList.todos.length === 0){
      console.log("The TodoList is empty: ");
    }else{
      console.log("Todos:");
    }

    todoList.todos.forEach(function(todo){
      if(todo.completed === true){
          console.log("(x)", todo.todoText);
      }else{
        console.log("()", todo.todoText);
      }
    });
  },
  createDeleteButton: function(){
      var deleteButton = $('<button id=deleteButton>Delete</button>');
      return deleteButton;
    }
};
*/
