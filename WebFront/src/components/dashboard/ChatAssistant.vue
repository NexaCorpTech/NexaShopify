<template>
  <div class="chat-container" :class="{ 'chat-visible': visible }">
    <Card class="chat-card">
      <template #header>
        <div class="chat-header">
          <div class="chat-info">
            <div class="chat-avatar">
              <i class="pi pi-comments" aria-hidden="true"></i>
            </div>
            <div class="chat-title">
              <h3>Assistant Nexashop</h3>
              <span class="chat-subtitle">En ligne</span>
            </div>
          </div>
          <div class="header-actions">
            <Button 
              icon="pi pi-minus" 
              text
              rounded
              severity="white"
              class="minimize-btn"
              @click="minimizeChat"
              v-tooltip.left="'Réduire'"
              aria-label="Réduire le chat"
            />
            <Button 
              icon="pi pi-times" 
              text
              rounded
              severity="white"
              class="close-btn"
              @click="closeChat"
              v-tooltip.left="'Fermer'"
              aria-label="Fermer le chat"
            />
          </div>
        </div>
      </template>

      <template #content >
        <div class="chat-content" :class="{ 'minimized': isMinimized }" :style="{overflowY:'auto'}">
          <div class="welcome-section" v-if="messages.length === 0">
            <div class="welcome-avatar">
              <span>AI</span>
            </div>
            <div class="welcome-content">
              <h4>Salut {{ currentUser.name }} 👋</h4>
              <p>Je suis votre assistant personnel pour configurer votre boutique Nexashop. Comment puis-je vous aider aujourd'hui ?</p>
            </div>
          </div>

          <div class="quick-actions" v-if="messages.length === 0">
            <h5>Actions rapides</h5>
            <div class="actions-grid">
              <div 
                v-for="action in quickActions"
                :key="action.id"
                class="action-card"
                :class="{ 'completed': setupTasks[action.key] }"
                @click="selectAction(action)"
                role="button"
                tabindex="0"
                @keyup.enter="selectAction(action)"
                :aria-label="action.title"
              >
                <div class="action-icon">
                  <i :class="action.icon" :aria-hidden="true"></i>
                </div>
                <div class="action-content">
                  <span class="action-title">{{ action.title }}</span>
                  <span class="action-description">{{ action.description }}</span>
                </div>
                <div class="action-status">
                  <i v-if="setupTasks[action.key]" class="pi pi-check-circle" :aria-hidden="true"></i>
                  <i v-else class="pi pi-arrow-right" :aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>

          <div v-if="messages.length > 0" class="chat-messages" ref="messagesContainer">
            <div 
              v-for="message in messages"
              :key="message.id"
              class="message-wrapper"
              :class="message.type"
            >
              <div v-if="message.type === 'ai'" class="message-avatar">
                <span>AI</span>
              </div>
              <div class="message-bubble">
                <div class="message-content">
                  <p v-html="formatMessage(message.content)"></p>
                </div>
                <div class="message-meta">
                  <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                  <div v-if="message.type === 'ai'" class="message-actions">
                    <Button 
                      icon="pi pi-copy" 
                      text 
                      size="small"
                      @click="copyMessage(message.content)"
                      v-tooltip="'Copier'"
                      aria-label="Copier le message"
                    />
                    <Button 
                      icon="pi pi-thumbs-up" 
                      text 
                      size="small"
                      @click="likeMessage(message.id)"
                      v-tooltip="'Utile'"
                      aria-label="Marquer comme utile"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="isTyping" class="message-wrapper ai">
              <div class="message-avatar">
                <span>AI</span>
              </div>
              <div class="message-bubble typing">
                <div class="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>

          <div class="chat-input-section">
            <div class="input-wrapper">
              <div class="input-container">
                <InputText 
                  v-model="newMessage"
                  placeholder="Tapez votre message..."
                  class="message-input"
                  @keyup.enter="sendMessage"
                  @input="handleInput"
                  :disabled="isTyping"
                  aria-label="Saisir un message"
                />
                <div class="input-actions">
                  <Button 
                    icon="pi pi-paperclip" 
                    text
                    size="small"
                    class="attach-btn"
                    @click="attachFile"
                    v-tooltip.top="'Joindre un fichier'"
                    aria-label="Joindre un fichier"
                  />
                  <Button 
                    icon="pi pi-send"
                    class="send-btn"
                    :disabled="!newMessage.trim() || isTyping"
                    @click="sendMessage"
                    size="small"
                    aria-label="Envoyer le message"
                  />
                </div>
              </div>
              <div class="input-suggestions" v-if="suggestions.length > 0">
                <div 
                  v-for="suggestion in suggestions"
                  :key="suggestion"
                  class="suggestion-chip"
                  @click="applySuggestion(suggestion)"
                  role="button"
                  tabindex="0"
                  @keyup.enter="applySuggestion(suggestion)"
                  :aria-label="suggestion"
                >
                  {{ suggestion }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { ref, computed, nextTick, watch, onMounted } from 'vue';
import { useDashboardStore } from '../../stores/dashboard';

export default {
  name: 'ChatAssistant',
  emits: ['close', 'minimize'],
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const dashboardStore = useDashboardStore();
    const { setupTasks, currentUser } = dashboardStore;

    const newMessage = ref('');
    const messages = ref([]);
    const isTyping = ref(false);
    const isMinimized = ref(false);
    const messagesContainer = ref(null);
    const suggestions = ref([]);

    const quickActions = computed(() => [
      { 
        id: 1, 
        key: 'importProducts', 
        title: 'Importer produits',
        description: 'Ajoutez vos produits via CSV',
        icon: 'pi pi-upload'
      },
      { 
        id: 2, 
        key: 'manageServices', 
        title: 'Configurer services',
        description: 'Livraison et garanties',
        icon: 'pi pi-cog'
      },
      { 
        id: 3, 
        key: 'customizeStore', 
        title: 'Design boutique',
        description: 'Personnalisez votre thème',
        icon: 'pi pi-palette'
      },
      { 
        id: 4, 
        key: 'importCustomers', 
        title: 'Importer clients',
        description: 'Base de données clients',
        icon: 'pi pi-users'
      },
      { 
        id: 5, 
        key: 'importOrders', 
        title: 'Importer commandes',
        description: 'Historique des ventes',
        icon: 'pi pi-shopping-cart'
      }
    ]);

    const selectAction = (action) => {
      newMessage.value = `Comment ${action.title.toLowerCase()} ?`;
      sendMessage();
    };

    const sendMessage = async () => {
      if (!newMessage.value.trim() || isTyping.value) return;

      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: newMessage.value,
        timestamp: new Date()
      };

      messages.value.push(userMessage);
      const userQuestion = newMessage.value;
      newMessage.value = '';
      suggestions.value = [];

      await scrollToBottom();
      
      isTyping.value = true;
      
      setTimeout(async () => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          content: getAIResponse(userQuestion),
          timestamp: new Date()
        };
        
        messages.value.push(aiResponse);
        isTyping.value = false;
        await scrollToBottom();
      }, 1500);
    };

    const getAIResponse = (question) => {
      const lowerQuestion = question.toLowerCase();
      
      const responses = {
        'importer': {
          response: `Pour importer vos produits, suivez ces étapes :\n\n**1. Préparez votre fichier CSV**\n- Colonnes requises: nom, prix, description, stock\n- Format: UTF-8\n\n**2. Accédez à l'import**\n- Menu Produits > Importer\n- Sélectionnez votre fichier\n\n**3. Vérifiez et validez**\n- Prévisualisez les données\n- Corrigez les erreurs éventuelles\n\nVoulez-vous que je vous guide étape par étape ?`,
          suggestions: ['Guide détaillé', 'Modèle CSV', 'Résoudre erreurs']
        },
        'gérer': {
          response: `La gestion des services comprend :\n\n**Services de livraison**\n- Configuration des zones\n- Tarifs et délais\n- Transporteurs partenaires\n\n**Garanties et SAV**\n- Conditions de retour\n- Politique de remboursement\n- Support client\n\nPar quoi souhaitez-vous commencer ?`,
          suggestions: ['Configurer livraison', 'Politique retours', 'Support client']
        },
        'design': {
          response: `Notre éditeur de thèmes vous permet de :\n\n**Personnalisation visuelle**\n- Couleurs et typographie\n- Logo et images\n- Mise en page responsive\n\n**Fonctionnalités avancées**\n- Sections personnalisées\n- Widgets interactifs\n- Optimisation mobile\n\nVoulez-vous commencer par le design de base ou des fonctionnalités spécifiques ?`,
          suggestions: ['Design de base', 'Fonctionnalités avancées', 'Optimisation mobile']
        },
        'clients': {
          response: `Pour importer vos clients :\n\n**Format requis**\n- Colonnes: nom, email, téléphone, adresse\n- Format CSV ou Excel\n- Respect RGPD obligatoire\n\n**Processus d'import**\n- Validation des données\n- Dédoublonnage automatique\n- Notification aux clients (optionnel)\n\nAvez-vous déjà préparé votre fichier client ?`,
          suggestions: ['Préparer fichier', 'RGPD et conformité', 'Segmentation clients']
        },
        'commandes': {
          response: `L'import des commandes nécessite :\n\n**Données essentielles**\n- Référence commande\n- Client, produits, montants\n- Dates et statuts\n\n**Synchronisation**\n- Mise à jour du stock\n- Historique des paiements\n- Suivi des livraisons\n\nD'où proviennent vos données de commandes ?`,
          suggestions: ['Autre plateforme', 'Fichier Excel', 'API externe']
        }
      };

      for (const [key, data] of Object.entries(responses)) {
        if (lowerQuestion.includes(key)) {
          setTimeout(() => {
            suggestions.value = data.suggestions;
          }, 100);
          return data.response;
        }
      }

      return `Je suis là pour vous aider avec votre boutique Nexashop ! 🚀\n\nJe peux vous assister avec :\n- **Configuration** de votre boutique\n- **Import** de produits et données\n- **Personnalisation** du design\n- **Gestion** des commandes et clients\n\nQuelle est votre priorité actuellement ?`;
    };

    const handleInput = () => {
      if (newMessage.value.length === 0) {
        suggestions.value = [];
      }
    };

    const applySuggestion = (suggestion) => {
      newMessage.value = suggestion;
      suggestions.value = [];
      sendMessage();
    };

    const formatMessage = (content) => {
      return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
    };

    const formatTime = (date) => {
      return date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    };

    const scrollToBottom = async () => {
      await nextTick();
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    };

    const copyMessage = async (content) => {
      try {
        await navigator.clipboard.writeText(content.replace(/\*\*(.*?)\*\*/g, '$1'));
      } catch (err) {
        console.error('Failed to copy message:', err);
      }
    };

    const likeMessage = (messageId) => {
      console.log('Message liked:', messageId);
    };

    const attachFile = () => {
      console.log('Attach file clicked');
    };

    const minimizeChat = () => {
      isMinimized.value = !isMinimized.value;
      emit('minimize', isMinimized.value);
    };

    const closeChat = () => {
      emit('close');
    };

    watch(messages, () => {
      scrollToBottom();
    }, { deep: true });

    return {
      newMessage,
      messages,
      isTyping,
      isMinimized,
      messagesContainer,
      suggestions,
      quickActions,
      setupTasks,
      currentUser,
      selectAction,
      sendMessage,
      handleInput,
      applySuggestion,
      formatMessage,
      formatTime,
      copyMessage,
      likeMessage,
      attachFile,
      minimizeChat,
      closeChat
    };
  }
}
</script>

<style scoped>
.chat-container {
  width: 400px;
  flex-shrink: 0;
  /* background: white;
  border-left: 1px solid #e2e8f0;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.05); */
}

.chat-container.chat-visible {
  /* width: 400px; */
  /* flex-shrink: 0; */
  background: white;
  border-left: 1px solid #e2e8f0;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.05);
}

/* .chat-container {
  position:fixed;
  top: 63px;
  top: 135px;
  right: 0;
  bottom: 0;
  width: clamp(320px, 30vw, 400px);
  z-index: 1000;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(10px);
} */

.chat-container.chat-visible {
  transform: translateX(0);

}

.chat-card {
  height: 100%;
  border: none;
  border-radius: 0;
  border-left: 1px solid #e2e8f0;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  background: #ffffff;
  overflow-y: auto;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 2vw, 1.25rem);
  border-bottom: 1px solid #f3f4f6;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.chat-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.chat-avatar {
  width: clamp(2rem, 5vw, 2.5rem);
  height: clamp(2rem, 5vw, 2.5rem);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-avatar i {
  color: white;
  font-size: clamp(1rem, 3vw, 1.125rem);
}

.chat-title h3 {
  font-size: clamp(0.9rem, 2vw, 1rem);
  font-weight: 600;
  margin: 0;
  color: white;
}

.chat-subtitle {
  font-size: clamp(0.7rem, 1.5vw, 0.75rem);
  opacity: 0.8;
  color: white;
}

.header-actions {
  display: flex;
  gap: 0.25rem;
}

.minimize-btn,
.close-btn {
  color: rgba(255, 255, 255, 0.8);
  width: clamp(1.8rem, 4vw, 2rem);
  height: clamp(1.8rem, 4vw, 2rem);
}

.minimize-btn:hover,
.close-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: clamp(0.75rem, 2vw, 1rem);
  gap: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.chat-content.minimized {
  display: none;
}

.welcome-section {
  display: flex;
  gap: 0.75rem;
  padding: clamp(0.75rem, 2vw, 1rem);
  background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%);
  border-radius: 12px;
  border: 1px solid #e0e7ff;
}

.welcome-avatar {
  width: clamp(2rem, 5vw, 2.5rem);
  height: clamp(2rem, 5vw, 2.5rem);
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  flex-shrink: 0;
}

.welcome-content h4 {
  font-size: clamp(0.9rem, 2vw, 1rem);
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.welcome-content p {
  font-size: clamp(0.8rem, 1.5vw, 0.875rem);
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

.quick-actions h5 {
  font-size: clamp(0.8rem, 1.5vw, 0.875rem);
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.75rem 0;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: clamp(0.625rem, 1.5vw, 0.75rem);
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-card:hover {
  border-color: #d1d5db;
  background: #f9fafb;
  transform: translateY(-1px);
}

.action-card.completed {
  border-color: #10b981;
  background: #f0fdf4;
}

.action-icon {
  width: clamp(1.8rem, 4vw, 2rem);
  height: clamp(1.8rem, 4vw, 2rem);
  border-radius: 6px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-card.completed .action-icon {
  background: #10b981;
  color: white;
}

.action-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.action-title {
  font-size: clamp(0.8rem, 1.5vw, 0.875rem);
  font-weight: 500;
  color: #374151;
}

.action-description {
  font-size: clamp(0.7rem, 1.2vw, 0.75rem);
  color: #6b7280;
}

.action-status {
  color: #9ca3af;
}

.action-card.completed .action-status {
  color: #10b981;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 0;
}

.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.message-wrapper {
  display: flex;
  gap: 0.5rem;
  animation: messageSlideIn 0.3s ease-out;
}

.message-wrapper.user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: clamp(1.5rem, 3vw, 1.75rem);
  height: clamp(1.5rem, 3vw, 1.75rem);
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: clamp(0.7rem, 1.2vw, 0.75rem);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.message-bubble {
  max-width: clamp(70%, 80vw, 85%);
  border-radius: 12px;
  padding: clamp(0.625rem, 1.5vw, 0.75rem) clamp(0.875rem, 2vw, 1rem);
  position: relative;
}

.message-wrapper.user .message-bubble {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-right: 0.5rem;
}

.message-wrapper.ai .message-bubble {
  background: #f3f4f6;
  color: #374151;
  margin-left: 0.5rem;
}

.message-bubble.typing {
  background: #f3f4f6;
  padding: clamp(0.875rem, 2vw, 1rem);
}

.message-content p {
  margin: 0;
  font-size: clamp(0.8rem, 1.5vw, 0.875rem);
  line-height: 1.5;
}

.message-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  gap: 0.5rem;
}

.message-time {
  font-size: clamp(0.7rem, 1.2vw, 0.75rem);
  opacity: 0.6;
}

.message-actions {
  display: flex;
  gap: 0.125rem;
}

.message-actions button {
  width: clamp(1.3rem, 3vw, 1.5rem);
  height: clamp(1.3rem, 3vw, 1.5rem);
  padding: 0;
  opacity: 0.6;
}

.message-actions button:hover {
  opacity: 1;
}

.typing-indicator {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.typing-indicator span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #9ca3af;
  animation: typingDot 1.5s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.3s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.6s;
}

.chat-input-section {
  border-top: 1px solid #f3f4f6;
  padding-top: clamp(0.75rem, 2vw, 1rem);
  margin-top: auto;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-container {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: clamp(0.375rem, 1vw, 0.5rem);
  transition: all 0.2s ease;
}

.input-container:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.message-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: clamp(0.2rem, 0.5vw, 0.25rem) 0;
  font-size: clamp(0.8rem, 1.5vw, 0.875rem);
  outline: none;
  resize: none;
  min-height: 1.5rem;
  max-height: 4rem;
}

.input-actions {
  display: flex;
  gap: 0.25rem;
  align-items: flex-end;
}

.attach-btn,
.send-btn {
  width: clamp(1.8rem, 4vw, 2rem);
  height: clamp(1.8rem, 4vw, 2rem);
}

.attach-btn {
  color: #6b7280;
}

.send-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 0;
}

.send-btn:disabled {
  background: #d1d5db;
  color: #9ca3af;
}

.send-btn:not(:disabled):hover {
  transform: scale(1.05);
}

.input-suggestions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.suggestion-chip {
  padding: clamp(0.3rem, 1vw, 0.375rem) clamp(0.625rem, 1.5vw, 0.75rem);
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  font-size: clamp(0.7rem, 1.2vw, 0.75rem);
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.suggestion-chip:hover {
  border-color: #667eea;
  background: #f0f4ff;
  color: #667eea;
}

/* Animations */
@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typingDot {
  0%, 60%, 100% {
    transform: scale(1);
    opacity: 0.4;
  }
  30% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .chat-container {
    width: 100%;
    top: 60px;
  }
}

@media (max-width: 768px) {
  .chat-container {
    top: 56px;
  }
  
  .chat-header {
    padding: clamp(0.625rem, 1.5vw, 0.75rem) clamp(0.875rem, 2vw, 1rem);
  }
  
  .chat-content {
    padding: clamp(0.625rem, 1.5vw, 0.75rem);
  }
  
  .welcome-section {
    padding: clamp(0.625rem, 1.5vw, 0.75rem);
  }
  
  .action-card {
    padding: clamp(0.5rem, 1.2vw, 0.625rem);
  }
  
  .message-bubble {
    max-width: 90%;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .chat-container,
  .action-card,
  .message-wrapper,
  .send-btn:not(:disabled):hover {
    transition: none;
    animation: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .chat-card {
    border-left-width: 2px;
  }
  
  .action-card {
    border-width: 2px;
  }
}
</style>