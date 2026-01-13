<template>
  <div class="admin">
    <transition name="fade" mode="out-in">
      <div v-if="!isAuthenticated" key="login" class="login-container">
        <div class="login-card">
          <div class="card-header">
            <h2>Admin Access</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  v-model="credentials.username" 
                  class="form-input"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  v-model="credentials.password" 
                  class="form-input"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button type="submit" class="login-btn" :disabled="isLoading">
                <span v-if="!isLoading">Sign In</span>
                <span v-else class="loading-spinner">⟳ Signing In...</span>
              </button>
              <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div v-else key="admin" class="admin-panel">
        <div class="panel-header">
          <h1>Website Management</h1>
          <button @click="logout" class="logout-btn" :disabled="isLoading">
            <span v-if="!isLoading">Logout</span>
            <span v-else class="loading-spinner">⟳ Logging Out...</span>
          </button>
        </div>
        <div class="panel-content">
          <div class="management-grid">
            <div class="management-card">
              <div class="card-icon">📝</div>
              <h3>Content Editor</h3>
              <p>Edit website content, pages, and text</p>
              <button class="action-btn" @click="openContentEditor">Edit Content</button>
            </div>
            
            <div class="management-card">
              <div class="card-icon">👥</div>
              <h3>Members Management</h3>
              <p>Add, edit, or remove community members</p>
              <button class="action-btn" @click="openMembersManager">Manage Members</button>
            </div>
            
            <div class="management-card">
              <div class="card-icon">🔄</div>
              <h3>Site Updates</h3>
              <p>Deploy updates and manage site versions</p>
              <button class="action-btn" @click="openUpdateManager">Site Updates</button>
            </div>
            
            <div class="management-card">
              <div class="card-icon">📢</div>
              <h3>Advisory Management</h3>
              <p>Create and manage community advisories</p>
              <button class="action-btn" @click="openAdvisoryManager">Manage Advisory</button>
            </div>
            
            <div class="management-card">
              <div class="card-icon">⚙️</div>
              <h3>Settings</h3>
              <p>Configure site settings and preferences</p>
              <button class="action-btn" @click="openSettings">Site Settings</button>
            </div>
          </div>
          
          <transition name="slide-fade">
            <div v-if="activeSection" class="section-content">
              <div class="section-header">
                <h2>{{ sectionTitle }}</h2>
                <button @click="closeSection" class="close-btn">×</button>
              </div>
              
              <div v-if="activeSection === 'content'" class="content-editor">
                <div class="editor-group">
                  <label>Page Title:</label>
                  <input v-model="editableContent.title" class="editor-input" />
                </div>
                <div class="editor-group">
                  <label>Page Content:</label>
                  <textarea v-model="editableContent.content" class="editor-textarea" rows="8"></textarea>
                </div>
                <button @click="saveContent" class="save-btn">Save Changes</button>
              </div>
              
              <div v-if="activeSection === 'members'" class="members-manager">
                <div class="member-form compact-form">
                  <div class="form-row">
                    <input v-model="newMember.name" placeholder="Name" class="compact-input" />
                    <input v-model="newMember.role" placeholder="Role" class="compact-input" />
                    <input type="file" id="memberPhoto" @change="handlePhotoUpload" accept="image/*" class="compact-file" />
                    <button @click="addMember" class="compact-btn">Add</button>
                  </div>
                  <div v-if="newMember.photoPreview" class="compact-preview">
                    <img :src="newMember.photoPreview" alt="Preview" class="small-preview" />
                    <button @click="removePhoto" class="tiny-btn">×</button>
                  </div>
                </div>
                <div class="members-list">
                  <div v-for="member in members" :key="member.id" class="compact-member">
                    <div class="member-info">
                      <img v-if="member.photo" :src="member.photo" alt="Member" class="tiny-photo" />
                      <div class="member-details">
                        <span class="member-name">{{ member.name }}</span>
                        <span class="member-role">{{ member.role }}</span>
                      </div>
                    </div>
                    <button @click="removeMember(member.id)" class="tiny-remove">×</button>
                  </div>
                </div>
              </div>
              
              <div v-if="activeSection === 'updates'" class="update-manager">
                <div class="update-info">
                  <p><strong>Current Version:</strong> 1.0.0</p>
                  <p><strong>Last Update:</strong> {{ new Date().toLocaleDateString() }}</p>
                </div>
                <button @click="deployUpdate" class="deploy-btn">Deploy Update</button>
              </div>
              
              <div v-if="activeSection === 'advisory'" class="advisory-manager">
                <div class="advisory-form">
                  <input v-model="newAdvisory.title" placeholder="Advisory Title" class="editor-input" />
                  <textarea v-model="newAdvisory.content" placeholder="Advisory Content" class="editor-textarea" rows="4"></textarea>
                  <button @click="addAdvisory" class="add-btn">Add Advisory</button>
                </div>
                <div class="advisory-list">
                  <div v-for="advisory in advisories" :key="advisory.id" class="advisory-item">
                    <div class="advisory-content">
                      <h4>{{ advisory.title }}</h4>
                      <p>{{ advisory.content }}</p>
                      <small>{{ advisory.date }}</small>
                    </div>
                    <button @click="removeAdvisory(advisory.id)" class="remove-btn">Remove</button>
                  </div>
                </div>
              </div>
              
              <div v-if="activeSection === 'settings'" class="settings-manager">
                <div class="setting-group">
                  <label>Site Name:</label>
                  <input v-model="siteSettings.name" class="editor-input" />
                </div>
                <div class="setting-group">
                  <label>Contact Email:</label>
                  <input v-model="siteSettings.email" class="editor-input" />
                </div>
                <button @click="saveSettings" class="save-btn">Save Settings</button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import authConfig from '@/config/auth.js'
import { adminStore } from '@/store/admin.js'
import { advisoryStore } from '@/store/advisory.js'
import { memberStore } from '@/store/members.js'

export default {
  name: 'Admin',
  data() {
    return {
      isAuthenticated: false,
      credentials: {
        username: '',
        password: ''
      },
      errorMessage: '',
      isLoading: false,
      activeSection: null,
      editableContent: {
        title: 'Purok Lapad Bato',
        content: 'Welcome to our community website.'
      },
      newMember: { name: '', role: '', photo: null, photoPreview: null },
      newAdvisory: { title: '', content: '' },
      siteSettings: {
        name: 'Purok Lapad Bato',
        email: 'contact@puroklapadbato.com'
      }
    }
  },
  computed: {
    sectionTitle() {
      const titles = {
        content: 'Content Editor',
        members: 'Members Management',
        advisory: 'Advisory Management',
        updates: 'Site Updates',
        settings: 'Site Settings'
      }
      return titles[this.activeSection] || ''
    },
    advisories() {
      return advisoryStore.advisories
    },
    members() {
      return memberStore.members
    }
  },
  methods: {
    login() {
      this.isLoading = true
      
      // Simulate loading delay
      setTimeout(() => {
        if (this.credentials.username === authConfig.admin.username && 
            this.credentials.password === authConfig.admin.password) {
          this.isAuthenticated = true
          adminStore.login()
          this.errorMessage = ''
          this.credentials = { username: '', password: '' }
        } else {
          this.errorMessage = 'Invalid username or password'
        }
        this.isLoading = false
      }, 1500)
    },
    logout() {
      this.isLoading = true
      
      // Simulate loading delay
      setTimeout(() => {
        this.isAuthenticated = false
        adminStore.logout()
        this.credentials = { username: '', password: '' }
        this.activeSection = null
        this.isLoading = false
      }, 1000)
    },
    openContentEditor() {
      this.activeSection = 'content'
    },
    openMembersManager() {
      this.activeSection = 'members'
    },
    openAdvisoryManager() {
      this.activeSection = 'advisory'
    },
    openUpdateManager() {
      this.activeSection = 'updates'
    },
    openSettings() {
      this.activeSection = 'settings'
    },
    closeSection() {
      this.activeSection = null
    },
    saveContent() {
      alert('Content saved successfully!')
    },
    addMember() {
      if (this.newMember.name && this.newMember.role) {
        memberStore.addMember(this.newMember)
        this.newMember = { name: '', role: '', photo: null, photoPreview: null }
      }
    },
    handlePhotoUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.newMember.photo = e.target.result
          this.newMember.photoPreview = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    removePhoto() {
      this.newMember.photo = null
      this.newMember.photoPreview = null
    },
    removeMember(id) {
      memberStore.removeMember(id)
    },
    addAdvisory() {
      if (this.newAdvisory.title && this.newAdvisory.content) {
        advisoryStore.addAdvisory(this.newAdvisory)
        this.newAdvisory = { title: '', content: '' }
      }
    },
    removeAdvisory(id) {
      advisoryStore.removeAdvisory(id)
    },
    deployUpdate() {
      alert('Update deployed successfully!')
    },
    saveSettings() {
      alert('Settings saved successfully!')
    }
  }
}
</script>

<style scoped>
.admin {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e1e5e9;
}

.card-header {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.card-body {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
}

.login-btn {
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.login-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.logout-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  background: #fee;
  color: #c0392b;
  padding: 0.75rem;
  border-radius: 6px;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  border: 1px solid #f5c6cb;
}

.admin-panel {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.panel-header {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background: #c0392b;
}

.panel-content {
  padding: 2rem;
  color: #2c3e50;
  flex: 1;
  overflow-y: auto;
}

.management-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.management-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.management-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.management-card h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.management-card p {
  color: #6c757d;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.action-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.action-btn:hover {
  background: #2980b9;
}

.section-content {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.close-btn {
  background: #6c757d;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
}

.editor-group, .setting-group {
  margin-bottom: 1rem;
}

.editor-group label, .setting-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.editor-input, .editor-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
}

.save-btn, .add-btn, .deploy-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.member-form {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.member-form input {
  flex: 1;
}

.members-list {
  max-height: 200px;
  overflow-y: auto;
}

.member-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.remove-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.update-info {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.deploy-btn {
  background: #17a2b8;
}

.advisory-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.advisory-list {
  max-height: 300px;
  overflow-y: auto;
}

.advisory-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.advisory-content h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.advisory-content p {
  margin: 0 0 0.5rem 0;
  color: #6c757d;
}

.advisory-content small {
  color: #adb5bd;
}

.file-input-group {
  margin-bottom: 1rem;
}

.file-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.file-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
}

.photo-preview {
  position: relative;
  margin-top: 1rem;
  display: inline-block;
}

.preview-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #dee2e6;
}

.remove-photo-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.member-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.member-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.member-photo {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #dee2e6;
}

.member-details {
  display: flex;
  flex-direction: column;
}

.member-name {
  font-weight: 500;
  color: #2c3e50;
}

.member-role {
  color: #6c757d;
  font-size: 0.9rem;
}

/* Compact Members Form */
.compact-form {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.form-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.photo-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.compact-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.9rem;
}

.compact-file {
  flex: 1;
  padding: 0.4rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.8rem;
}

.compact-btn {
  padding: 0.5rem 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}

.compact-preview {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.small-preview {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.tiny-btn {
  width: 20px;
  height: 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.compact-member {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.tiny-photo {
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #dee2e6;
}

.tiny-remove {
  padding: 0.25rem 0.5rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

/* Transition Styles */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-fade-enter-active {
  transition: all 0.4s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>