# 🚀 Ready Messages Client - Migração para camelCase

## 📋 Resumo das Mudanças

Os DTOs do Ready Messages Client foram atualizados para usar **camelCase em inglês** seguindo as melhores práticas do TypeScript/JavaScript.

---

## 🔄 DTOs Atualizados

### ✅ Novos DTOs (camelCase)

```typescript
// CreateReadyMessageDto
interface CreateReadyMessageDto {
  title: string;           // "Título da mensagem"
  message: string;         // "Conteúdo da mensagem"
  sectorId?: number;       // "ID do setor (opcional)"
  onlyAdmin?: boolean;     // "Apenas para admin (opcional)"
}

// UpdateReadyMessageDto  
interface UpdateReadyMessageDto {
  title?: string;          // "Novo título (opcional)"
  message?: string;        // "Nova mensagem (opcional)"
  onlyAdmin?: boolean;     // "Flag admin (opcional)"
}
```

### 🔄 Conversão Automática

O client **automaticamente converte** camelCase para o formato que o backend espera:

```typescript
// Input (camelCase - novo)
{
  title: "Horário",
  message: "8h às 18h",
  sectorId: 10,
  onlyAdmin: true
}

// ↓ Conversão automática ↓

// Output (UPPERCASE - backend)
{
  TITULO: "Horário",
  TEXTO_MENSAGEM: "8h às 18h", 
  SETOR: 10,
  APENAS_ADMIN: true
}
```

---

## 📝 Guia de Migração

### Antes (UPPERCASE)
```typescript
// ❌ Formato antigo
await client.createReadyMessage({
  TITULO: "Mensagem de Boas-vindas",
  TEXTO_MENSAGEM: "Olá! Bem-vindo!",
  SETOR: 10,
  APENAS_ADMIN: false
});

await client.updateReadyMessage(123, {
  TITULO: "Novo Título",
  TEXTO_MENSAGEM: "Nova mensagem"
});
```

### Agora (camelCase)
```typescript
// ✅ Formato novo
await client.createReadyMessage({
  title: "Mensagem de Boas-vindas",
  message: "Olá! Bem-vindo!",
  sectorId: 10,
  onlyAdmin: false
});

await client.updateReadyMessage(123, {
  title: "Novo Título",
  message: "Nova mensagem"
});
```

---

## 🛠️ Mapeamento de Campos

| Antigo (UPPERCASE) | Novo (camelCase) | Tipo | Descrição |
|-------------------|------------------|------|-----------|
| `TITULO` | `title` | `string` | Título da mensagem |
| `TEXTO_MENSAGEM` | `message` | `string` | Conteúdo da mensagem |
| `SETOR` | `sectorId` | `number?` | ID do setor (opcional) |
| `APENAS_ADMIN` | `onlyAdmin` | `boolean?` | Flag para admin (opcional) |

---

## 💡 Exemplos Práticos

### 1. Criar Mensagem Simples
```typescript
const message = await client.createReadyMessage({
  title: "Horário de Funcionamento",
  message: "Funcionamos de segunda a sexta, das 8h às 18h"
});
```

### 2. Criar Mensagem com Arquivo
```typescript
const message = await client.createReadyMessage({
  title: "Catálogo 2025",
  message: "Confira nosso novo catálogo em anexo",
  sectorId: 5,
  onlyAdmin: false
}, fileObject);
```

### 3. Criar Mensagem Apenas para Admin
```typescript
const adminMessage = await client.createReadyMessage({
  title: "Procedimento Interno",
  message: "Instruções confidenciais para administradores",
  onlyAdmin: true  // 🔒 Só admins veem
});
```

### 4. Atualização Parcial
```typescript
// Atualizar apenas o título
await client.updateReadyMessage(123, {
  title: "Título Atualizado"
});

// Atualizar apenas a mensagem
await client.updateReadyMessage(123, {
  message: "Mensagem atualizada com novas informações"
});

// Tornar mensagem exclusiva para admin
await client.updateReadyMessage(123, {
  onlyAdmin: true
});
```

### 5. Com Upload de Arquivo
```typescript
const updatedMessage = await client.updateReadyMessage(
  123,
  {
    title: "Manual Atualizado",
    message: "Nova versão do manual em anexo"
  },
  newFileObject
);
```

---

## 🎯 Benefícios

### ✅ Consistência
- Segue padrões TypeScript/JavaScript
- Alinhado com conventions modernas
- Melhor legibilidade do código

### ✅ IntelliSense Melhorado  
```typescript
// Auto-complete mostra:
data.title     // ✅ Claro e conciso
data.message   // ✅ Descritivo
data.sectorId  // ✅ Tipado como number

// Ao invés de:
data.TITULO           // ❌ GRITANDO
data.TEXTO_MENSAGEM   // ❌ Verboso
data.SETOR           // ❌ Ambíguo
```

### ✅ Melhor Manutenibilidade
- Nomes em inglês facilitam colaboração internacional
- camelCase é padrão do ecossistema JS/TS
- Menos confusão entre frontend e backend

---

## 🔄 Compatibilidade

### DTOs Legados Disponíveis

Para facilitar migração gradual, os tipos antigos ainda estão disponíveis:

```typescript
import { 
  CreateReadyMessageDtoLegacy,
  UpdateReadyMessageDtoLegacy 
} from './types/ready-messages.types';

// ⚠️ Depreciado - migre para os novos DTOs
const oldData: CreateReadyMessageDtoLegacy = {
  TITULO: "Test",
  TEXTO_MENSAGEM: "Test message"
};
```

**⚠️ Aviso:** DTOs legados serão removidos na versão 4.0.0

---

## 🧪 Testando a Migração

### Teste Básico
```typescript
import ReadyMessageClient from '@in.pulse-crm/sdk';

const client = new ReadyMessageClient('http://localhost:8000');
client.setAuth(token);

// Teste de criação
const message = await client.createReadyMessage({
  title: "Teste de Migração",
  message: "Se você está lendo isso, a migração funcionou! 🎉"
});

console.log('✅ Migração bem-sucedida!');
console.log('ID da mensagem:', message.id);
console.log('Título:', message.title);
```

### Teste com Todos os Campos
```typescript
const fullTest = await client.createReadyMessage({
  title: "Teste Completo",
  message: "Testando todos os campos disponíveis",
  sectorId: 10,
  onlyAdmin: true
}, null);

// Teste de atualização
const updated = await client.updateReadyMessage(fullTest.id, {
  title: "Título Atualizado",
  onlyAdmin: false
});

console.log('✅ Teste completo bem-sucedido!');
```

---

## ❓ FAQ

### P: Preciso alterar o backend?
**R:** Não! O client faz a conversão automaticamente. O backend continua recebendo UPPERCASE.

### P: E se eu usar os campos antigos por engano?
**R:** TypeScript mostrará erro de compilação. Isso evita bugs em produção.

### P: Posso misturar formatos antigos e novos?
**R:** Não recomendado. Use apenas os novos DTOs para consistência.

### P: Como saber se estou usando a versão correta?
**R:** Verifique se seus DTOs usam `title`, `message`, `sectorId`, `onlyAdmin`.

---

## 🎓 Resumo

### O que mudou:
- ✅ DTOs agora usam camelCase em inglês
- ✅ Conversão automática para backend
- ✅ Melhor IntelliSense e documentação
- ✅ Compatibilidade mantida temporariamente

### O que você precisa fazer:
1. Atualizar seus DTOs para camelCase
2. Testar a integração
3. Remover referências aos DTOs legados

### Deadline:
- **Migração recomendada:** Imediatamente
- **DTOs legados removidos:** Versão 4.0.0

---

**Versão:** 3.1.0  
**Data:** 15/10/2025  
**Breaking Changes:** Não (compatibilidade mantida)  
**Próxima versão:** DTOs legados serão removidos