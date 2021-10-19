import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

import { Tarefa } from '../models/tarefa.model';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-cadastro-tarefas',
  templateUrl: './cadastro-tarefas.component.html',
  styleUrls: ['./cadastro-tarefas.component.css']
})
export class CadastroTarefasComponent implements OnInit {

  // atributo
  mensagem: string = "";

  // inicializando a classe tarefas.service pelo construtor (injeção de dependência)
  constructor(private tarefasService: TarefasService) { }

  ngOnInit(): void {
  }

  // declarando o conteúdo do formulário
  formCadastro = new FormGroup({
    // declarando os campos do formulário
    nome: new FormControl('', [Validators.required, Validators.minLength(6)]),
    data: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required, Validators.minLength(10)]),
    prioridade: new FormControl('', [Validators.required])
  });

  // função para exibir na página as mensagens de validação de cada campo
  // permitido acessar as prioridades de cada campo do formulário
  get form(): any {
    return this.formCadastro.controls;
  }

  // função para processar o SUBMIT do formulário
  onSubmit(): void {

    // capturar os dados do formulário e armazenar na model
    const tarefa: Tarefa = {
      idTarefa: this.tarefasService.gerarId(),
      nome: this.formCadastro.value.nome,
      data: this.formCadastro.value.data,
      hora: this.formCadastro.value.hora,
      descricao: this.formCadastro.value.descricao,
      prioridade: this.formCadastro.value.prioridade
    };

    // cadastrar a tarefa
    this.tarefasService.cadastrar(tarefa);

    // exibir mensagem na página
    this.mensagem = "Tarefa cadastrada com sucesso!"

    // limpar os campos do formulário
    this.formCadastro.reset();
  }

  // função para limpar a mensagem
  clear(): void {
    this.mensagem = "";
  }


}
