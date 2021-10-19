import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../models/tarefa.model';
import { TarefasService } from '../services/tarefas.service';

@Component({
  selector: 'app-consulta-tarefas',
  templateUrl: './consulta-tarefas.component.html',
  styleUrls: ['./consulta-tarefas.component.css']
})
export class ConsultaTarefasComponent implements OnInit {

  // atributo pra poder guardar as tarefas
  listagem: Tarefa[] = [];
  tarefa: Tarefa = { idTarefa: 0, nome: '', data: '', hora: '', descricao: '', prioridade: '' }
  pagina = 1;

  // inicializando  por injeção de dependência
  constructor(private tarefasService: TarefasService) { }

  ngOnInit(): void {

    // executar as consultas e obter tarefas cadastradas
    this.listagem = this.tarefasService.consultar();
  }

  // função para realizar a paginação do componente
  onPageChange(event: any): void {
    this.pagina = event;
  }

  // função para obter os dados de uma tarefa através de id
  obterTarefa(id: number): void {
    this.tarefa = this.tarefasService.obterPorId(id);
  }

  // função pra excluir a tarefa
  excluirTarefa(): void {
    this.tarefasService.excluir(this.tarefa) // excluindo...
    this.ngOnInit();  // recarregar a consulta

  }



}
