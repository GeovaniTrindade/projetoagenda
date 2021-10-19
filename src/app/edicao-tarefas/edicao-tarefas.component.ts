import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TarefasService } from '../services/tarefas.service';
import { Tarefa } from '../models/tarefa.model';

@Component({
  selector: 'app-edicao-tarefas',
  templateUrl: './edicao-tarefas.component.html',
  styleUrls: ['./edicao-tarefas.component.css']
})
export class EdicaoTarefasComponent implements OnInit {

  // atributo
  mensagem: string = "";

  constructor(
    private activatedRoute: ActivatedRoute, // inicialização automática
    private tarefasService: TarefasService // inicialização automática
  ) { }

  // função executada quando o componente é carregado
  ngOnInit(): void {

    // capturando o id da tarefa enviando na url (rota)
    const idTarefa = this.activatedRoute.snapshot.paramMap.get('id') as string;

    // capturar os dados da tarefa através do id
    const tarefa = this.tarefasService.obterPorId(parseInt(idTarefa));

    // preenchendo o formulário com os dados da tarefa
    this.formEdicao.controls.idTarefa.setValue(tarefa.idTarefa);
    this.formEdicao.controls.nome.setValue(tarefa.nome);
    this.formEdicao.controls.data.setValue(tarefa.data);
    this.formEdicao.controls.hora.setValue(tarefa.hora);
    this.formEdicao.controls.descricao.setValue(tarefa.descricao);
    this.formEdicao.controls.prioridade.setValue(tarefa.prioridade);

  }

  // declarando o conteúdo do formulário
  formEdicao = new FormGroup({
    // declarando os campos do formulário
    idTarefa: new FormControl('', []), // campo oculto
    nome: new FormControl('', [Validators.required, Validators.minLength(6)]),
    data: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required, Validators.minLength(10)]),
    prioridade: new FormControl('', [Validators.required])
  });

  // função para exibir na página as mensagens de validação de cada campo
  // permitido acessar as prioridades de cada campo do formulário
  get form(): any {
    return this.formEdicao.controls;
  }

  // função pra capturar o submit do usuário
  onSubmit(): void {
    // atualizando os dados da tarefa
    var tarefa: Tarefa = {
      idTarefa: this.formEdicao.value.idTarefa,
      nome: this.formEdicao.value.nome,
      data: this.formEdicao.value.data,
      hora: this.formEdicao.value.hora,
      descricao: this.formEdicao.value.descricao,
      prioridade: this.formEdicao.value.prioridade
    }

    this.tarefasService.atualizar(tarefa);
    
    // exibir mensagem na tela
    this.mensagem =" Tarefa atualizada com sucesso!";

  }

  // função para limpar a mensagem
  clear(): void {
    this.mensagem = "";
  }

}
