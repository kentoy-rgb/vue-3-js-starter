<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__right">
        <p>Purok Lapad Bato est 2026.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background: #3498db;
  color: white;
  padding: 1rem;
  margin-top: auto;
  height: 60px;
  box-sizing: border-box;
}

.footer__content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.footer__right p {
  margin: 0;
  font-size: 0.9rem;
}
</style>