Serialização

A serialização é um processo que ocorre antes que os objetos sejam retornados em uma resposta de rede. Este é um local apropriado para fornecer regras para transformar e limpar os dados a serem retornados ao cliente.

   Ex.:
    - Dados confidenciais como senhas sempre devem ser excluídos da resposta.
    - Ou certas propriedades podem exigir transformação adicional, como enviar apenas um subconjunto de propriedades de uma entidade.

Executar essas transformações manualmente pode ser tedioso e propenso a erros, além de deixar você incerto de que todos os casos foram cobertos.


1 - Excluir propriedades

 Exclui automaticamente uma propriedade de uma entidade de usuário.

  import { Exclude } from 'class-transformer';

  export class UserEntity {
    id: number;
    firstName: string;
    lastName: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<UserEntity>) {
      Object.assign(this, partial);
    }
  }


2 - Expor propriedades:

 Fornece nomes de alias para propriedades e executa uma função para trabalhar com valores de propriedade (análogo às funções getter )

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

3 - Transformar:

 Permite executar transformações de dados adicionais.
 A construção a seguir retorna a propriedade "name" do RoleEntity em vez de retornar o objeto inteiro.

  @Transform(({ value }) => value.name)
  role: RoleEntity;


4 - Serialize Options:

  As opções passadas @SerializeOptions()são passadas como o segundo argumento da função subjacente instanceToPlain().

  Neste exemplo, estamos excluindo automaticamente todas as propriedades que começam com o _prefixo.

  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  @Get()
  findOne(): UserEntity {
    return new UserEntity();
  }
