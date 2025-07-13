import React from 'react';

function About() {
  return (
    <div className="container">
      <h1 className="page-title">About Notify</h1>
      
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="section-title">
                <i className="fas fa-info-circle me-2" style={{ color: "var(--primary)" }}></i>
                Our Mission
              </h2>
              <p className="lead">
                Notify is a modern note-taking application designed to help you organize your thoughts, ideas, and tasks in one secure place.
              </p>
              <p>
                We believe that effective note-taking should be simple, intuitive, and accessible from anywhere. Our mission is to provide you with a powerful yet easy-to-use platform that adapts to your workflow, not the other way around.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body d-flex flex-column justify-content-center text-center">
              <i className="fas fa-note-sticky fa-4x mb-3" style={{ color: "var(--primary)" }}></i>
              <h3 className="fw-bold">Notify</h3>
              <p className="text-muted">Version 1.0.0</p>
              <p>Your personal note-taking solution</p>
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="section-title mt-4">
        <i className="fas fa-star me-2" style={{ color: "var(--primary)" }}></i>
        Key Features
      </h2>
      
      <div className="row g-4">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="feature-icon me-3">
                  <i className="fas fa-lock" style={{ color: "var(--primary)", fontSize: "1.5rem" }}></i>
                </div>
                <h3 className="card-title h5 mb-0">Secure Storage</h3>
              </div>
              <p className="card-text">Your notes are securely stored with end-to-end encryption, ensuring your private thoughts remain private.</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="feature-icon me-3">
                  <i className="fas fa-tags" style={{ color: "var(--primary)", fontSize: "1.5rem" }}></i>
                </div>
                <h3 className="card-title h5 mb-0">Smart Tagging</h3>
              </div>
              <p className="card-text">Organize your notes with custom tags for easy filtering and quick access to related content.</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="feature-icon me-3">
                  <i className="fas fa-cloud" style={{ color: "var(--primary)", fontSize: "1.5rem" }}></i>
                </div>
                <h3 className="card-title h5 mb-0">Cloud Sync</h3>
              </div>
              <p className="card-text">Access your notes from any device with automatic cloud synchronization, never lose your important information.</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="feature-icon me-3">
                  <i className="fas fa-palette" style={{ color: "var(--primary)", fontSize: "1.5rem" }}></i>
                </div>
                <h3 className="card-title h5 mb-0">Beautiful UI</h3>
              </div>
              <p className="card-text">A clean, modern interface designed for focus and productivity with customizable themes.</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="feature-icon me-3">
                  <i className="fas fa-bolt" style={{ color: "var(--primary)", fontSize: "1.5rem" }}></i>
                </div>
                <h3 className="card-title h5 mb-0">Fast Performance</h3>
              </div>
              <p className="card-text">Lightning-fast search and note creation, designed to keep up with your thoughts.</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="feature-icon me-3">
                  <i className="fas fa-mobile-alt" style={{ color: "var(--primary)", fontSize: "1.5rem" }}></i>
                </div>
                <h3 className="card-title h5 mb-0">Responsive Design</h3>
              </div>
              <p className="card-text">Works perfectly on all devices, from smartphones to desktop computers.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card shadow-sm border-0 mt-4 mb-4">
        <div className="card-body">
          <h2 className="section-title">
            <i className="fas fa-code me-2" style={{ color: "var(--primary)" }}></i>
            Technology Stack
          </h2>
          <div className="row g-4">
            <div className="col-md-3 col-6 text-center">
              <div className="tech-icon mb-2">
                <i className="fab fa-react fa-3x" style={{ color: "#61DAFB" }}></i>
              </div>
              <h5>React</h5>
              <p className="small text-muted">Frontend Library</p>
            </div>
            <div className="col-md-3 col-6 text-center">
              <div className="tech-icon mb-2">
                <i className="fab fa-node-js fa-3x" style={{ color: "#68A063" }}></i>
              </div>
              <h5>Node.js</h5>
              <p className="small text-muted">Backend Runtime</p>
            </div>
            <div className="col-md-3 col-6 text-center">
              <div className="tech-icon mb-2">
                <i className="fas fa-database fa-3x" style={{ color: "#4DB33D" }}></i>
              </div>
              <h5>MongoDB</h5>
              <p className="small text-muted">Database</p>
            </div>
            <div className="col-md-3 col-6 text-center">
              <div className="tech-icon mb-2">
                <i className="fas fa-lock fa-3x" style={{ color: "#FFC107" }}></i>
              </div>
              <h5>JWT</h5>
              <p className="small text-muted">Authentication</p>
            </div>
          </div>
        </div>
      </div>
      
      
      
      
    </div>
  );
}

export default About;
