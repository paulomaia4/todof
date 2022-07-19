import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from './service/todo.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  todos: Todo[] = []
  form: FormGroup = new FormGroup({
    descricao: new FormControl('', [Validators.required, Validators.minLength(4)])
  })
constructor(
  private service: TodoService
){}

ngOnInit(){
  this.listarTodos()
}

listarTodos(){
  this.service.listar().subscribe(todoList => this.todos = todoList)
}

submit(){
 
  const todo: Todo = {...this.form.value}
  this.service
  .salvar(todo)
  .subscribe(savedTodo => {
    this.todos.push(savedTodo)
    this.form.reset()
  })
}
finalizado(todo: Todo){
  this.service.marcarComoConcluido(todo.id).subscribe({
    next: (todoAtualizado) => {
      todo.finalizado = todoAtualizado.finalizado
      todo.dataTermino = todoAtualizado.dataTermino
    }
  })
}

delete(todo: Todo){
  this.service.deletar(todo.id).subscribe({
    next: (response) => this.listarTodos()
  })
}

}

