  <template>
  <div class="members">
    <div class="members-header">
      <h1>Purok Members</h1>
      <p>Meet our dedicated community members of Purok Lapad Bato</p>
    </div>
    
    <div class="members-container">
      <div v-if="members.length === 0" class="no-members">
        <div class="empty-state">
          <div class="empty-icon">👥</div>
          <h3>No Members Yet</h3>
          <p>Community members will be displayed here once added.</p>
        </div>
      </div>
      
      <div v-else class="members-grid">
        <div v-for="member in members" :key="member.id" class="member-card">
          <div class="member-photo">
            <img v-if="member.photo" :src="member.photo" :alt="member.name" class="photo" />
            <div v-else class="default-avatar">
              <span>{{ getInitials(member.name) }}</span>
            </div>
          </div>
          <div class="member-info">
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-role">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { memberStore } from '@/store/members.js'

export default {
  name: 'Members',
  computed: {
    members() {
      return memberStore.members
    }
  },
  methods: {
    getInitials(name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
  }
}
</script>

<style scoped>
.members {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.members-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e9ecef;
}

.members-header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.members-header p {
  color: #6c757d;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

.members-container {
  min-height: 400px;
}

.no-members {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.empty-state {
  text-align: center;
  color: #6c757d;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #495057;
  margin-bottom: 0.5rem;
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.member-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e9ecef;
  text-align: center;
  padding: 2rem 1.5rem;
}

.member-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.member-photo {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #3498db;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.default-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db, #2980b9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.member-info {
  text-align: center;
}

.member-name {
  color: #2c3e50;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.member-role {
  color: #3498db;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  padding: 0.5rem 1rem;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 20px;
  display: inline-block;
}

@media (max-width: 768px) {
  .members {
    padding: 1rem;
  }
  
  .members-header h1 {
    font-size: 2rem;
  }
  
  .members-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .member-card {
    padding: 1.5rem 1rem;
  }
  
  .photo, .default-avatar {
    width: 100px;
    height: 100px;
  }
  
  .default-avatar {
    font-size: 2rem;
  }
}
</style>