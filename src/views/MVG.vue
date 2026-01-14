<template>
  <div class="mvg">
    <div class="mvg-section mission">
      <h2>MISSION</h2>
      <p>To Build Strong Relationship and Social Bonding with neighbors, to create a peaceful Community not for today but for the next Generation.</p>
      <p>Maintain the Cleanliness in the Community</p>
    </div>

    <div class="mvg-section vision">
      <h2>VISION</h2>
      <p>To make Lapad Bato as well known for the next five years, to develop the natural resources in the area, to maintain the safety of the Lapad Bato Spring as sources of drinking water.</p>
      <p>Make Lapad Bato Cave as one of tourist attraction.</p>
    </div>

    <div class="mvg-section goals">
      <h2>GOALS</h2>
      <p>To Stabilize the net income of the Families to add more sources of income and livelihoods, to develop the water facilities within the area.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MVG'
}
</script>

<style scoped>
.mvg {
  width: 100%;
  height: 90vh;
  margin: 0;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  box-sizing: border-box;
  font-family: 'Old English Text MT', 'Blackletter', serif;
}

.mvg-section {
  margin-bottom: 0;
  padding: 2rem;
  border-radius: 8px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  height: calc(70vh - 2rem);
  flex: 1;
}

.mvg-section h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  border-radius: 4px;
}

.mvg-section p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.mission h2 {
  background: #56d437;
  color: #2c3e50;
}

.vision h2 {
  background: #56d437;
  color: #2c3e50;
}

.goals h2 {
  background: #56d437;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .mvg {
    padding: 1rem;
    flex-direction: column;
    height: auto;
  }

  .mvg-section {
    padding: 1.5rem;
    height: auto;
    margin-bottom: 1rem;
  }

  .mvg-section h2 {
    font-size: 1.5rem;
  }

  .mvg-section p {
    font-size: 1rem;
  }
}
</style>
