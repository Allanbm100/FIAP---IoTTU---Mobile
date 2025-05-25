# Projeto de Monitoramento de Motos via ESP32 + App React Native

## 👥 Integrantes

- **Allan Brito Moreira** — RM: 558948 
- **Levi Magni** — RM: 98276  
- **Caio Liang** — RM: 558868  

---

## 📱 Descrição da Solução

Este projeto tem como objetivo monitorar o status e a localização de motocicletas utilizando sensores embarcados (ESP32) que transmitem dados via MQTT. Um aplicativo mobile foi desenvolvido com React Native para visualizar e gerenciar essas informações em tempo real.

### Funcionalidades implementadas

- Cadastro e login de usuários (dados armazenados localmente com `AsyncStorage`);
- Listagem de motos com informações como:
  - Zona, status e distância;
- Detalhes da moto com:
  - Alteração de status (Disponível, Em Manutenção, Indisponível);
  - Registro e exibição de observações persistentes;
- Edição de nome, e-mail e senha do usuário;
- Logout com persistência de sessão.

---

## 🚀 Como executar o projeto

1. **Instale as dependências do projeto:**

```bash
npm install

2. **Inicie o projeto:**

```bash
npx expo start

3. **Crie uma conta para iniciar a sessão**