const toolCards = [...document.querySelectorAll('.tool-card')];
const filters = [...document.querySelectorAll('.filter')];
const search = document.getElementById('tool-search');
const emptyState = document.getElementById('empty-state');
let activeFilter = 'all';

function updateTools() {
    const query = search.value.trim().toLowerCase();
    let visibleCount = 0;
    toolCards.forEach(card => {
        const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
        const matchesSearch = !query || card.dataset.search.includes(query);
        const visible = matchesFilter && matchesSearch;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
    });
    emptyState.hidden = visibleCount !== 0;
}

filters.forEach(filter => filter.addEventListener('click', () => {
    activeFilter = filter.dataset.filter;
    filters.forEach(item => item.classList.toggle('active', item === filter));
    updateTools();
}));
search.addEventListener('input', updateTools);

const chatPanel = document.getElementById('chat-panel');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const openChat = () => { chatPanel.classList.add('open'); chatPanel.setAttribute('aria-hidden', 'false'); setTimeout(() => chatInput.focus(), 250); };
const closeChat = () => { chatPanel.classList.remove('open'); chatPanel.setAttribute('aria-hidden', 'true'); };
document.getElementById('open-chat').addEventListener('click', openChat);
document.getElementById('hero-chat').addEventListener('click', openChat);
document.getElementById('close-chat').addEventListener('click', closeChat);

function addMessage(text, type) {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function answerFor(text) {
    const lower = text.toLowerCase();
    if (lower.includes('website') || lower.includes('build')) return 'Start with Code Sandbox, then use Prompt Lab to turn the idea into a build plan. That is a good little launch sequence.';
    if (lower.includes('focus') || lower.includes('work')) return 'Focus Sprint is the one. Set 25 minutes, choose one tiny outcome, and let the rest wait outside the room.';
    if (lower.includes('design') || lower.includes('color')) return 'Palette Picker is waiting in the toolbox. It is a quick way to find a visual direction before you polish the details.';
    return 'Interesting. I would start by searching the toolbox above, then tell me what you find. I am still learning the corners of this place too.';
}

document.getElementById('chat-form').addEventListener('submit', event => {
    event.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    setTimeout(() => addMessage(answerFor(text), 'bot'), 350);
});
document.querySelectorAll('.quick-replies button').forEach(button => button.addEventListener('click', () => {
    chatInput.value = button.dataset.message;
    document.getElementById('chat-form').requestSubmit();
}));
document.querySelectorAll('.tool-link').forEach(button => button.addEventListener('click', () => {
    openChat();
    chatInput.value = `Tell me about ${button.dataset.tool}`;
    document.getElementById('chat-form').requestSubmit();
}));

document.querySelectorAll('.rating-button').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.rating-button').forEach(item => item.classList.toggle('selected', Number(item.dataset.rating) <= Number(button.dataset.rating)));
}));
document.getElementById('feedback-form').addEventListener('submit', event => {
    event.preventDefault();
    document.getElementById('form-status').textContent = 'Thanks for helping shape WittyWrens. Your note is on the board.';
    event.target.reset();
    document.querySelectorAll('.rating-button').forEach(item => item.classList.remove('selected'));
});
