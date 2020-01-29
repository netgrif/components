pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh 'npm install'
        echo 'Dependencies Installed'
      }
    }

    stage('Test') {
      parallel {
        stage('Test') {
          steps {
            sh 'npm run ng test netgrif-application-engine'
          }
        }

        stage('Lint') {
          steps {
            sh 'npm run ng lint netgrif-application-engine'
          }
        }

      }
    }

    stage('Build') {
      steps {
        sh 'npm run nae:build'
      }
    }

    stage('Doc') {
      steps {
        sh 'npm run nae:doc'
      }
    }

    stage('ZIP') {
      steps {
        zip(archive: true, zipFile: 'nae-${env.BUILD_TAG}.zip', dir: './dist/netgrif-application-engine')
      }
    }

  }
}